'use client';

import { useState } from 'react';
import { Box, Divider, IconButton, Stack, Tooltip } from '@mui/material';
import {
  MailOutline,
  LockOutline,
  LockOpenOutlined,
  AddModeratorOutlined,
  DeleteOutline,
  HelpOutlineOutlined,
  SaveOutlined,
  ClearOutlined,
} from '@mui/icons-material';
import { OutlineButton, PrimaryButton, TextButton } from '@/core/component';

// --- Cấu hình các điểm cố định ---
const START_POINT = { x: 40, y: 180, id: 'start' };
const END_POINTS = [
  { x: 480, y: 15, id: 'end-1', permission: 'ADMIN_P_USERS' },
  { x: 480, y: 75, id: 'end-2', permission: 'ADMIN_P_ROLES' },
  { x: 480, y: 135, id: 'end-3', permission: 'ADMIN_P_PERMISSIONS' },
  { x: 480, y: 195, id: 'end-4', permission: 'ADMIN_P_WORDS' },
  { x: 480, y: 255, id: 'end-5', permission: 'ADMIN_P_TOPICS' },
  { x: 480, y: 315, id: 'end-6', permission: 'ADMIN_P_LIBRARIES' },
  { x: 480, y: 375, id: 'end-7', permission: 'ADMIN_P_AUDITLOG' },
];
const SNAP_DISTANCE = 30; // Khoảng cách tối đa để "hít" vào điểm

export const UserPermission = ({ setIsOpenModal }) => {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(null);

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
  const handleMouseUp = () => {
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
      const newLine = { start: START_POINT, end: closestPoint };

      // Kiểm tra để không tạo đường nối trùng lặp
      const isDuplicate = lines.some((line) => line.end.id === closestPoint.id);

      if (!isDuplicate) {
        setLines([...lines, newLine]);
      }
    }

    // Reset đường đang vẽ
    setCurrentLine(null);
  };

  return (
    <Box className="text-black">
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <h1 className="font-bold text-[18px]">Permission Manager</h1>
        <TextButton icon={<ClearOutlined />} width={'40px'} handleClick={setIsOpenModal} />
      </Stack>

      <Divider />
      <Stack direction={'row'} alignItems={'center'} className="text-black">
        <Stack direction="row" alignItems="center" className="mb-4 w-52">
          <Stack
            className="p-3 rounded-2xl w-full items-center bg-gray-400"
            style={{
              boxShadow: '0 2px 25px rgba(117, 26, 255, 0.7)',
              animation: 'slideDown 0.8s ease-out forwards',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',

              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
            spacing={1}
          >
            <Box component={'img'} src="/images/trieuden.jpg" alt="Permission" className="h-24 w-24 rounded-full object-cover" />
            <span className="font-semibold text-lg">Huynh Trieu</span>
            <Divider className="my-1 w-10" />
            <span className="text-sm text-gray-500">Admin</span>
            <Stack direction="row" spacing={1} alignItems="center">
              <MailOutline fontSize="16px" />
              <span className=" text-[12px] text-black">yantic088@gmail.com</span>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
              <Tooltip title="Move all permissions" arrow>
                <span>
                  <TextButton icon={<DeleteOutline />} width={'40px'} height={'30px'} color="#e60000" />
                </span>
              </Tooltip>

              <Tooltip
                title="- Connect the blue dots to grant permissions to the user
              - Click on the line to delete it"
                arrow
              >
                <span>
                  <TextButton icon={<HelpOutlineOutlined />} width={'40px'} height={'30px'} />
                </span>
              </Tooltip>
            </Stack>
          </Stack>
        </Stack>
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
          {lines.map((line, index) => (
            <line
              key={index}
              x1={line.start.x}
              y1={line.start.y}
              x2={line.end.x}
              y2={line.end.y}
              stroke="blue"
              strokeWidth="3"
              onClick={() => {
                setLines(lines.filter((_, i) => i !== index));
              }}
              className="cursor-pointer"
            />
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
                onClick={() => setLines(lines.filter((line) => line.end.id !== point.id))}
              >
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  className={`${isConnected ? 'bg-[#80ff8086]' : 'bg-[#cccccc86]'} flex items-center p-2 rounded-lg`}
                  style={{
                    width: 'fit-content',
                  }}
                >
                  {isConnected ? (
                    <LockOpenOutlined sx={{ color: 'green', fontSize: '20px', marginRight: '8px' }} />
                  ) : (
                    <LockOutline sx={{ color: 'white', fontSize: '20px', marginRight: '8px' }} />
                  )}

                  {/* Phần Text của bạn */}
                  <span className="text-black text-[13px]">{point.permission}</span>
                </div>
              </foreignObject>
            );
          })}
        </svg>
      </Stack>
      <Stack direction={'row'} spacing={2} justifyContent={'flex-end'}>
        <OutlineButton icon={<SaveOutlined />} title="Save" width="90px" fontSize={'16px'} />
      </Stack>
    </Box>
  );
};
