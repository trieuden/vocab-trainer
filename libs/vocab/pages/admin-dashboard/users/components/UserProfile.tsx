import { useEffect, useState } from 'react';
import React from 'react';
import { Stack, Box, Divider } from '@mui/material';
import { Clear, AccountCircleOutlined, SettingsOutlined } from '@mui/icons-material';
import { useQueryClient } from '@tanstack/react-query';

import { CustomTextField, SelectInput, TextButton, TextFieldInput, PrimaryButton, OutlineButton, DateInput } from '@/core/component';
import { CreateUserDto, UpdateUserDto, UserModel } from '@/core/models';
import { RoleModel } from '@/core/models/RoleModel';
import { getAllRoles } from '@/core/services/RoleServices';
import { formatDate, validEmail, validPassword, validPhoneNumber, validUsername } from '@/vocab/utils';
import { useNotification, useConfirmation, useFadeTransition } from '@/vocab/providers';
import { createUser, getAllUsers, updateUser } from '@/core/services/UserServices';
import { Gender } from '@/core/enums/UserEnum';

type UserProfileProps = {
  setIsOpenModal: (value: boolean) => void;
  currentUser?: UserModel;
};

type UserFormState = Partial<CreateUserDto & UpdateUserDto>;

type ValidState = Partial<{
  name: boolean;
  roleId: boolean;
  username: boolean;
  password: boolean;
  email: boolean;
  birthDate: boolean;
  phoneNumber: boolean;
  gender: boolean;
}>;

export const UserProfile = ({ setIsOpenModal, currentUser }: UserProfileProps) => {
  const queryClient = useQueryClient();

  const { setNotification } = useNotification();
  const { setConfirmation } = useConfirmation();
  const { triggerFade } = useFadeTransition();

  const [roles, setRoles] = useState<Partial<RoleModel>[]>([]);
  const [allUsers, setAllUsers] = useState<UserModel[]>([]);
  const [user, setUser] = useState<UserFormState>(currentUser ? (currentUser as UserFormState) : {});
  const [avatar, setAvatar] = useState<File>();

  const [valid, setValid] = useState<ValidState>({
    name: true,
    roleId: true,
    username: true,
    password: true,
    email: true,
    birthDate: true,
    phoneNumber: true,
    gender: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllRoles();
      setRoles(data);

      const userData = await getAllUsers();
      setAllUsers(userData);
    };
    fetchData();
  }, [currentUser]);

  const getAvatarSrc = () => {
    if (user.avatar && user.avatar instanceof File) {
      return URL.createObjectURL(user.avatar);
    }
    return user.avatar || '/images/default.png';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file?.size > 5 * 1024 * 1024) {
      setNotification('File size exceeds 5MB limit.', 'error');
      return;
    }
    if (file) {
      setUser({ ...user, avatar: file, isDeleteAvatar: false });
      setAvatar(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar(undefined);
    setUser({ ...user, isDeleteAvatar: true, avatar: undefined });
  };

  const handleSave = async () => {
    if (Object.values(valid).some((v) => v !== true)) {
      setNotification('Please fix the validation errors before saving.', 'error');
      return;
    }
    if (currentUser) {
      {
        if (await setConfirmation('Confirm Save', 'Are you sure you want to save the changes to this user?')) {
          const userData: UpdateUserDto = {
            ...(user.password && { password: user.password }),
            ...(user.name && { name: user.name }),
            ...(avatar && { avatar }),
            ...(user.gender && { gender: user.gender }),
            ...(user.birthDate && { birthDate: user.birthDate }),
            ...(user.phoneNumber && { phoneNumber: user.phoneNumber }),
            isDeleteAvatar: user.isDeleteAvatar || false,
          };

          await updateUser(currentUser ? currentUser.id : '', userData);
          triggerFade(() => {
            setNotification('User updated successfully', 'success');
            setUser({});
            queryClient.invalidateQueries({
              queryKey: ['users', currentUser.role.roleName],
            });
            setIsOpenModal(false);
          });
        }
      }
    } else {
      var validationFailed = false;
      Object.keys(valid).forEach((k) => {
        const key = k as keyof ValidState;

        if (!(user as any)[key]) {
          setValid((prev) => ({ ...prev, [key]: false }));
          validationFailed = true;
        }
      });
      if (validationFailed) {
        setNotification('Please fill in all required fields.', 'error');
        return;
      }

      if (await setConfirmation('Confirm Save', 'Are you sure you want to create this user?')) {
        const userData: CreateUserDto = {
          username: user.username!,
          password: user.password!,
          name: user.name!,
          birthDate: user.birthDate!,
          phoneNumber: user.phoneNumber!,
          email: user.email!,
          roleId: user.roleId!,
          ...(user.gender && { gender: user.gender }),
          ...(avatar && { avatar }),
        };

        await createUser(userData);
        triggerFade(() => {
          setNotification('User created successfully', 'success');
          setUser({});
          queryClient.invalidateQueries({ queryKey: ['users'] });
          setIsOpenModal(false);
        });
      }
    }
  };

  return (
    <Stack spacing={2} className="text-black" component={'main'}>
      <Stack component={'header'} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <h1 className="font-bold text-[18px] pl-3">Profile</h1>
        <TextButton
          startIcon={<Clear />}
          width={'35px'}
          fontSize={23}
          handleClick={() => {
            setIsOpenModal(false);
            setUser({});
          }}
        />
      </Stack>
      <Stack spacing={4} direction={'row'}>
        <Stack className="flex-1 w-full" spacing={1}>
          <TextButton
            title="Account"
            isHoverBgColor={true}
            color="white"
            width={'100%'}
            startIcon={<AccountCircleOutlined />}
            bgColor="var(--bgButtonPrimary)"
            height={'40px'}
          />
          <TextButton title="General" isHoverBgColor={true} color="black" startIcon={<SettingsOutlined />} height={'40px'} />
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack className="flex-3" spacing={2}>
          <Stack direction={'row'} spacing={8} alignItems={'center'} justifyContent={'space-between'}>
            <span className="text-[14px] text-black font-semibold w-[120px]">Name</span>
            <TextFieldInput
              value={user?.name || ''}
              setValue={(v) => {
                setUser({ ...user, name: v.toString() });
              }}
              isValid={valid.name}
              handleBlur={() => {
                setValid((prev) => ({ ...prev, name: true }));
              }}
              roundedWidth={3}
            />
          </Stack>
          <Stack direction={'row'} spacing={8} alignItems={'center'} justifyContent={'space-between'}>
            <span className="text-[14px] text-black font-semibold w-[120px]">Role</span>
            <SelectInput
              selectedValue={currentUser ? currentUser?.role.roleName : roles.find((r) => r.id === user?.roleId)?.roleName}
              value={roles}
              labelField="roleName"
              isValid={valid.roleId}
              onSelectId={(v) => {
                if (!!v) {
                  setValid((prev) => ({ ...prev, roleId: true }));
                  setUser({ ...user, roleId: String(v) });
                }
              }}
              roundedWidth={3}
              disabled={!!currentUser}
            />
          </Stack>

          {/* Username */}
          <Stack direction={'row'} spacing={8} alignItems={'center'} justifyContent={'space-between'}>
            <span className="text-[14px] text-black font-semibold w-[120px]">Username</span>
            <TextFieldInput
              value={user?.username || ''}
              setValue={(v) => {
                setUser({ ...user, username: v.toString() });
              }}
              roundedWidth={3}
              isValid={valid.username}
              handleBlur={() => {
                setValid((prev) => ({ ...prev, username: true }));
                if (!!user.username && !validUsername(user.username)) {
                  setNotification('Username must be 3-20 characters long and contain only letters, numbers, or underscores.', 'error');
                  setValid((prev) => ({ ...prev, username: false }));
                }
                if (allUsers.some((u) => u.username === user.username && u.id !== currentUser?.id)) {
                  setNotification('Username already exists. Please choose a different username.', 'error');
                  setValid((prev) => ({ ...prev, username: false }));
                }
              }}
              disabled={!!currentUser}
            />
          </Stack>
          {/* Password */}
          <Stack direction={'row'} spacing={8} alignItems={'center'} justifyContent={'space-between'}>
            <span className="text-[14px] text-black font-semibold w-[120px]">Password</span>
            <TextFieldInput
              value={user.password || ''}
              setValue={(v) => {
                setUser({ ...user, password: v.toString() });
              }}
              roundedWidth={3}
              type="password"
              isValid={(user.password ? validPassword(user.password) : true) && valid.password}
              handleBlur={() => {
                if (!!user.password && !validPassword(user.password)) {
                  setNotification('Use 8+ characters with a mix of uppercase, lowercase letters, and numbers.', 'error');
                  setValid((prev) => ({ ...prev, password: false }));
                } else {
                  setValid((prev) => ({ ...prev, password: true }));
                }
              }}
            />
          </Stack>
          {/* Email */}
          <Stack direction={'row'} spacing={8} alignItems={'center'} justifyContent={'space-between'}>
            <span className="text-[14px] text-black font-semibold w-[120px]">Email</span>
            <TextFieldInput
              value={user.email || ''}
              setValue={(v) => {
                setUser({ ...user, email: v.toString() });
              }}
              roundedWidth={3}
              isValid={(user.email ? validEmail(user.email) : true) && valid.email}
              handleBlur={() => {
                setValid((prev) => ({ ...prev, email: true }));
                if (!!user.email && !validEmail(user.email)) {
                  setNotification('Invalid email format. Example: user@example.com', 'error');
                  setValid((prev) => ({ ...prev, email: false }));
                }

                if (allUsers.some((u) => u.username === user.username && u.id !== currentUser?.id)) {
                  setNotification('Username already exists. Please choose a different username.', 'error');
                  setValid((prev) => ({ ...prev, email: false }));
                }
              }}
              disabled={!!currentUser}
            />
          </Stack>
          {/* Phone number */}
          <Stack direction={'row'} spacing={8} alignItems={'center'} justifyContent={'space-between'}>
            <span className="text-[14px] text-black font-semibold w-[120px]">Phone</span>
            <TextFieldInput
              value={user.phoneNumber || ''}
              setValue={(v) => {
                setUser({ ...user, phoneNumber: v.toString() });
              }}
              roundedWidth={3}
              isValid={(user.phoneNumber ? validPhoneNumber(user.phoneNumber) : true) && valid.phoneNumber}
              handleBlur={() => {
                setValid((prev) => ({ ...prev, phoneNumber: true }));
                if (!!user.phoneNumber && !validPhoneNumber(user.phoneNumber)) {
                  setNotification('Invalid phone number format. Example: +1234567890', 'error');
                  setValid((prev) => ({ ...prev, phoneNumber: false }));
                }

                if (allUsers.some((u) => u.phoneNumber === user.phoneNumber && u.id !== currentUser?.id)) {
                  setNotification('Phone number already exists. Please choose a different phone number.', 'error');
                  setValid((prev) => ({ ...prev, phoneNumber: false }));
                }
              }}
              disabled={!!currentUser}
            />
          </Stack>

          <Stack direction={'row'} spacing={8} alignItems={'center'} justifyContent={'space-between'}>
            <span className="text-[14px] text-black font-semibold w-[120px]">Avatar</span>
            <Stack direction="row" className="w-[60%] relative items-center flex-1">
              <label htmlFor="avatar-upload">
                <Box
                  component="img"
                  src={getAvatarSrc()}
                  alt="avatar"
                  className="rounded-full h-16 w-16 object-cover cursor-pointer hover:opacity-80 transition"
                />
              </label>

              <Box className="absolute bottom-10 left-18">
                <TextButton startIcon={<Clear />} handleClick={() => handleRemoveAvatar()} width={'8px'} fontSize={'16px'} />
              </Box>

              <input id="avatar-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
            </Stack>
          </Stack>
          {/* Gender */}
          <Stack direction={'row'} spacing={8} alignItems={'center'} justifyContent={'space-between'}>
            <Stack direction={'row'} spacing={3} alignItems={'center'} justifyContent={'space-between'}>
              <span className="text-[14px] text-black font-semibold">Gender</span>
              <SelectInput
                selectedValue={user.gender || ''}
                value={[
                  { id: '0', name: 'male' },
                  { id: '1', name: 'female' },
                  { id: '2', name: 'other' },
                ]}
                isValid={valid.gender}
                onChange={(v) => {
                  setUser({ ...user, gender: v.toString() === 'male' ? Gender.MALE : v.toString() === 'female' ? Gender.FEMALE : Gender.OTHER });
                  setValid((prev) => ({ ...prev, gender: true }));
                }}
                roundedWidth={3}
                width={'190px'}
              />
            </Stack>
            <Stack direction={'row'} spacing={3} alignItems={'center'} justifyContent={'space-between'}>
              <span className="text-[14px] text-black font-semibold ">Birthdays</span>
              <DateInput
                date={user.birthDate || ''}
                setDate={(v) => {
                  setUser({ ...user, birthDate: v.toString() });
                  setValid((prev) => ({ ...prev, birthDate: true }));
                }}
                isValid={valid.birthDate}
                width={'190px'}
                roundedWidth={3}
              />
            </Stack>
          </Stack>
          {currentUser && (
            <Stack direction={'row'} spacing={8} alignItems={'center'} sx={{ height: '36px' }}>
              <span className="text-[14px] text-black font-semibold  w-[120px]">Last Active</span>
              <span className="text-[14px]">{formatDate(currentUser?.lastActiveAt, 'datetime')}</span>
            </Stack>
          )}
        </Stack>
      </Stack>
      <Stack direction={'row'} spacing={2} justifyContent={'flex-end'}>
        <TextButton
          title="Exit"
          width={'70px'}
          height={'30px'}
          handleClick={() => {
            setIsOpenModal(false);
            setUser({});
          }}
        />
        <PrimaryButton title="Save" width="120px" height={'30px'} bgColor={'var(--bgButtonPrimary)'} handleClick={() => handleSave()} />
      </Stack>
    </Stack>
  );
};
