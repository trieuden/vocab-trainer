import { Divider, Stack, Box } from '@mui/material';
import { Clear, AccountCircleOutlined, SettingsOutlined } from '@mui/icons-material';
import { CustomTextField, SelectInput, TextButton, TextFieldInput, PrimaryButton, OutlineButton } from '@/core/component';

type UserProfileProps = {
  setIsOpenModal: (value: boolean) => void;
};

export const UserProfile = ({ setIsOpenModal }: UserProfileProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Selected file:', file);
      // TODO: xử lý upload hoặc hiển thị ảnh mới
    }
  };
  return (
    <Stack spacing={3} className="text-black">
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <h1 className="font-bold text-[18px] pl-3">Profile</h1>
        <TextButton icon={<Clear />} width={'35px'} fontSize={23} handleClick={() => setIsOpenModal(false)} />
      </Stack>
      <Stack spacing={4} direction={'row'}>
        <Stack className="flex-1" spacing={1}>
          <TextButton title="Account" isHoverBgColor={true} color="black" icon={<AccountCircleOutlined />} bgColor="#8c8c8c1A" />
          <TextButton title="General" isHoverBgColor={true} color="black" icon={<SettingsOutlined />} />
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack className="flex-3" spacing={2}>
          <Stack direction={'row'} spacing={8} alignItems={'center'} justifyContent={'space-between'}>
            <span className="text-[14px] text-black font-semibold w-[120px]">User Role</span>
            <SelectInput
              selectedValue={''}
              value={[
                { id: '0 ', name: 'User' },
                { id: '1', name: 'Admin' },
              ]}
              onChange={() => {}}
              roundedWidth={3}
              disabled={true}
            />
          </Stack>
          <Stack direction={'row'} spacing={8} alignItems={'center'} justifyContent={'space-between'}>
            <span className="text-[14px] text-black font-semibold w-[120px]">Username</span>
            <TextFieldInput value={''} setValue={() => {}} roundedWidth={3} />
          </Stack>
          <Stack direction={'row'} spacing={8} alignItems={'center'} justifyContent={'space-between'}>
            <span className="text-[14px] text-black font-semibold w-[120px]">Password</span>
            <TextFieldInput value={''} setValue={() => {}} roundedWidth={3} type="password" />
          </Stack>
          <Stack direction={'row'} spacing={8} alignItems={'center'} justifyContent={'space-between'}>
            <span className="text-[14px] text-black font-semibold w-[120px]">Email</span>
            <TextFieldInput value={''} setValue={() => {}} roundedWidth={3} />
          </Stack>
          <Stack direction={'row'} spacing={8} alignItems={'center'} justifyContent={'space-between'}>
            <span className="text-[14px] text-black font-semibold w-[120px]">Avatar</span>
            <Stack direction="row" className="w-[60%] relative items-center flex-1">
              <label htmlFor="avatar-upload">
                <Box
                  component="img"
                  src="/images/trieuden.jpg"
                  alt="avatar"
                  className="rounded-full h-16 w-16 object-cover cursor-pointer hover:opacity-80 transition"
                />
              </label>

              <Box className="absolute bottom-10 left-18">
                <TextButton icon={<Clear />} width={'8px'} fontSize={'16px'} />
              </Box>

              <input id="avatar-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
            </Stack>
          </Stack>

          <Stack direction={'row'} spacing={8} alignItems={'center'} justifyContent={'space-between'}>
            <span className="text-[14px] text-black font-semibold  w-[120px]">Gender</span>
            <SelectInput
              selectedValue={''}
              value={[
                { id: '0', name: 'Male' },
                { id: '1', name: 'Female' },
              ]}
              onChange={() => {}}
              roundedWidth={3}
            />
          </Stack>
          <Stack direction={'row'} spacing={8} alignItems={'center'} justifyContent={'space-between'}>
            <span className="text-[14px] text-black font-semibold  w-[120px]">Last Active</span>
            <CustomTextField value={'10/2/2025'} className="flex-1" />
          </Stack>
        </Stack>
      </Stack>
      <Stack direction={'row'} spacing={2} justifyContent={'flex-end'}>
        <TextButton title="Exit" width={'70px'} handleClick={() => setIsOpenModal(false)} />
        <PrimaryButton title="Save" width="120px" bgColor="#009933" />
      </Stack>
    </Stack>
  );
};
