import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';

interface CustomSwitchProps extends SwitchProps {
  checkedIcon?: string;
  unCheckedIcon?: string;
  customColor?: string;
  height?: number;
  width?: number;
}

export const CustomSwitch = styled(Switch, {
  shouldForwardProp: (prop) => prop !== 'checkedIcon' && prop !== 'unCheckedIcon' && prop !== 'customColor' && prop !== 'height' && prop !== 'width',
})<CustomSwitchProps>(({ theme, checkedIcon, unCheckedIcon, customColor, height = 34, width = 62 }) => {
  const thumbSize = Math.round(height * 0.35); // nút tròn chiếm ~35% chiều cao
  const translateX = width - height; // quãng đường dịch thumb
  const iconSize = Math.round(height * 0.8); // icon nhỏ theo height

  return {
    width,
    height,
    padding: Math.round(height * 0.2),
    position: 'relative',

    '& .MuiSwitch-switchBase': {
      top: (height - thumbSize) / 2,
      left: thumbSize,
      padding: 0,
      transform: `translateX(0px)`,
      '&.Mui-checked': {
        transform: `translateX(${translateX}px)`,
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: customColor || 'white',
          '&:before': { display: 'none' },
          '&:after': { display: 'block' },
        },
      },
    },

    // Nút tròn
    '& .MuiSwitch-thumb': {
      backgroundColor: 'transparent',
      width: thumbSize,
      height: thumbSize,
      border: '2px solid #6600cc',
      borderRadius: '50%',
    },

    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: 'transparent',
      borderRadius: height / 2,
      position: 'relative',
      border: '2px solid #6600cc',

      '&:before, &:after': {
        content: "''",
        position: 'absolute',
        width: iconSize,
        height: iconSize,
        top: '53%',
        transform: 'translateY(-50%)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
      },
      '&:before': {
        left: translateX - iconSize / 3,
        backgroundImage: unCheckedIcon ? `url(${unCheckedIcon})` : '',
      },
      '&:after': {
        right: translateX - iconSize / 3,
        display: 'none',
        backgroundImage: checkedIcon ? `url(${checkedIcon})` : '',
      },
    },
  };
});
