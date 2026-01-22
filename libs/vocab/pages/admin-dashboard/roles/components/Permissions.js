'use client';

import { useEffect, useState } from 'react';
import { Box, Divider, IconButton, Stack, Tooltip } from '@mui/material';
import { MailOutline, LockOutline, LockOpenOutlined, DeleteOutline, HelpOutlineOutlined, ClearOutlined } from '@mui/icons-material';
import { useConfirmation, useNotification } from '@/vocab/providers';
import { useQueryClient } from '@tanstack/react-query';
import { createRolePermission, deleteRolePermission } from '@/core/services/RolePermissionServices';
import { use } from 'i18next';
import { getAllPermissions } from '@/core/services/PermissionServices';

// --- Cấu hình các điểm cố định ---
const START_POINT = { x: 40, y: 180, id: 'start' };
const ADMIN_END_POINTS = [
  { x: 480, y: 15, id: 'end-1', permission: 'ADMIN_P_USERS' },
  { x: 480, y: 75, id: 'end-2', permission: 'ADMIN_P_ROLES' },
  { x: 480, y: 135, id: 'end-3', permission: 'ADMIN_P_PERMISSIONS' },
  { x: 480, y: 195, id: 'end-4', permission: 'ADMIN_P_WORDS' },
  { x: 480, y: 255, id: 'end-5', permission: 'ADMIN_P_TOPICS' },
  { x: 480, y: 315, id: 'end-6', permission: 'ADMIN_P_LIBRARIES' },
  { x: 480, y: 375, id: 'end-7', permission: 'ADMIN_P_AUDITLOGS' },
];
const ACCOUNT_END_POINTS = [{ x: 480, y: 177, id: 'end-1', permission: 'USER_S_ACCESS' }];
const SNAP_DISTANCE = 30; // Khoảng cách tối đa để "hít" vào điểm

export const Permissions = ({ role }) => {
  const { setConfirmation } = useConfirmation();
  const { setNotification } = useNotification();

  const END_POINTS = role.roleName === 'admin' ? ADMIN_END_POINTS : ACCOUNT_END_POINTS;
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(null);

  const [allPermission, setAllPermission] = useState([]);

  const queryClient = useQueryClient();

  useEffect(() => {
    setLines([]);
    if (role && role.rolePermissions) {
      const perms = role.rolePermissions;
      if (perms) drawPermission(perms);
    }
  }, [role]);

  useEffect(() => {
    const fetchPermission = async () => {
      const res = await getAllPermissions();
      setAllPermission(res);
    };
    fetchPermission();
  }, []);

  const drawPermission = (permissions) => {
    if (!permissions) return;

    permissions.forEach((p) => {
      const endPointIndex = END_POINTS.findIndex((ep) => ep.permission === p.permission.permissionName);
      if (endPointIndex === -1) return;
      setLines((prevLines) => [
        ...prevLines,
        {
          start: START_POINT,
          end: END_POINTS[endPointIndex],
          permission: p.permission.permissionName,
          rolePermission: p,
        },
      ]);
    });
  };

  // Tính khoảng cách giữa 2 điểm
  const calculateDistance = (p1, p2) => {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  };

  // Bắt đầu kéo, chỉ hoạt động khi nhấn vào điểm bắt đầu
  const handleMouseDown = (e) => {
    // Chỉ bắt đầu vẽ khi người dùng nhấn vào điểm bên trái
    if (e.target.id === START_POINT.id) {
      const { clientX, clientY, currentTarget } = e;
      const { left, top } = currentTarget.getBoundingClientRect();
      const endPoint = { x: clientX - left, y: clientY - top };
      setCurrentLine({ start: START_POINT, end: endPoint });
    }
  };

  // Di chuyển chuột để vẽ đường "live"
  const handleMouseMove = (e) => {
    if (!currentLine) return;

    const { clientX, clientY, currentTarget } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    const endPoint = { x: clientX - left, y: clientY - top };
    setCurrentLine({ ...currentLine, end: endPoint });
  };

  // Thả chuột, kiểm tra và nối điểm
  const handleMouseUp = async () => {
    if (!currentLine) return;

    let closestPoint = null;
    let minDistance = Infinity;

    // Tìm điểm cuối gần nhất trong danh sách END_POINTS
    END_POINTS.forEach((point) => {
      const distance = calculateDistance(currentLine.end, point);
      if (distance < minDistance) {
        minDistance = distance;
        closestPoint = point;
      }
    });

    // Nếu điểm gần nhất nằm trong khoảng "hít", tạo đường nối
    if (closestPoint && minDistance <= SNAP_DISTANCE) {
      // Kiểm tra để không tạo đường nối trùng lặp
      const isDuplicate = lines.some((line) => line && line.end && line.end.id === closestPoint.id);
      if (!isDuplicate) {
        // Thêm đường
        if (
          await setConfirmation('Confirm Save', `Are you sure to grant permission ${closestPoint.permission} to role ${role.roleName.toUpperCase()}?`)
        ) {
          const rolePermission = await createRolePermission({
            roleId: role.id,
            permissionId: allPermission.find((p) => p.permissionName === closestPoint.permission).id,
          });
          queryClient.invalidateQueries({
            queryKey: ['roles'],
          });

          setLines((prevLines) => [
            ...prevLines,
            { start: START_POINT, end: closestPoint, permission: closestPoint.permission, rolePermissions: rolePermission },
          ]);
          setNotification(`Permission ${closestPoint.permission} granted to role ${role.roleName.toUpperCase()} successfully.`, 'success');
        }
      }
    }

    // Reset đường đang vẽ
    setCurrentLine(null);
  };

  return (
    <Box className="text-black select-none  border border-gray-300 rounded-xl relative">
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} className="bg-gray-200 h-10 rounded-t-xl px-3">
        <h1 className="font-bold text-[18px]">Permissions</h1>
      </Stack>

      <Stack direction={'row'} alignItems={'center'} className="text-black">
        <svg
          width="85%"
          height="400px"
          style={{ margin: '20px auto', cursor: 'default' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* --- Vẽ các đường đã nối thành công --- */}
          {lines &&
            lines
              .filter((line) => line && line.start && line.end)
              .map((line, index) => (
                <Tooltip key={index} title={line.permission} arrow>
                  <line
                    x1={line.start.x}
                    y1={line.start.y}
                    x2={line.end.x}
                    y2={line.end.y}
                    stroke={'blue'}
                    strokeWidth="3"
                    className="cursor-pointer"
                  />
                </Tooltip>
              ))}

          {/* --- Vẽ đường đang được kéo (live preview) --- */}
          {currentLine && (
            <line
              x1={currentLine.start.x}
              y1={currentLine.start.y}
              x2={currentLine.end.x}
              y2={currentLine.end.y}
              stroke="gray"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          )}

          {/* --- Vẽ điểm bắt đầu --- */}
          <circle id={START_POINT.id} cx={START_POINT.x} cy={START_POINT.y} r="10" fill="green" style={{ cursor: 'pointer' }} />

          {/* --- Vẽ 7 điểm kết thúc --- */}

          {END_POINTS.map((point) => {
            // Kiểm tra xem điểm này đã được nối chưa
            const isConnected = lines.some((line) => line.end.id === point.id);

            return (
              <foreignObject
                key={point.id}
                x={point.x - 10 / 2} // Căn x (cần điều chỉnh)
                y={point.y - 15} // Căn y (cần điều chỉnh)
                width={200}
                height={42}
                className="select-none cursor-pointer overflow-visible"
                onClick={async () => {
                  // Xử lý khi click vào điểm kết thúc (xóa kết nối)
                  if (isConnected) {
                    if (
                      await setConfirmation('Confirm Remove', `Are you sure to remove permission ${point.permission} from role ${role.roleName}?`)
                    ) {
                      await deleteRolePermission(role.rolePermissions.find((rp) => rp.permission.permissionName === point.permission).id);
                      queryClient.invalidateQueries({
                        queryKey: ['roles'],
                      });
                      setNotification(`Permission ${point.permission} removed from role ${role.roleName} successfully.`, 'success');
                      setLines((prev) => prev.filter((line) => line && line.end && line.end.id !== point.id));
                    }
                  }
                }}
              >
                <Tooltip title={isConnected ? 'Click to remove permission' : 'Drag to assign permission'} arrow>
                  <div
                    xmlns="http://www.w3.org/1999/xhtml"
                    className={`${
                      isConnected ? 'bg-[#80ff8086]' : 'bg-[#ffffff86]'
                    } flex items-center p-2 rounded-lg box-shadow-md border border-gray-300`}
                    style={{
                      width: 'fit-content',
                    }}
                  >
                    {isConnected ? (
                      <LockOpenOutlined sx={{ color: 'green', fontSize: '20px', marginRight: '8px' }} />
                    ) : (
                      <LockOutline sx={{ color: 'black', fontSize: '20px', marginRight: '8px' }} />
                    )}

                    {/* Phần Text của bạn */}
                    <span className="text-black text-[13px]">{point.permission}</span>
                  </div>
                </Tooltip>
              </foreignObject>
            );
          })}
        </svg>
      </Stack>
    </Box>
  );
};
