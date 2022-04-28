import cloud from '../assets/images/sun/27.png';
import clear from '../assets/images/sun/26.png';
import rain from '../assets/images/cloud/7.png';
import thunder from '../assets/images/cloud/17.png';
import snow from '../assets/images/cloud/23.png';
import mist from '../assets/images/sun/4.png';
import haze from '../assets/images/sun/4.png';

const gambar = [
  {
    cuaca: '-',
    img: clear,
  },
  {
    cuaca: 'Haze',
    img: haze,
  },
  {
    cuaca: 'Clear',
    img: clear,
  },
  {
    cuaca: 'Clouds',
    img: cloud,
  },
  {
    cuaca: 'Snow',
    img: snow,
  },
  {
    cuaca: 'Rain',
    img: rain,
  },
  {
    cuaca: 'Thunderstorm',
    img: thunder,
  },
  {
    cuaca: 'Drizzle',
    img: rain,
  },
  {
    cuaca: 'Mist',
    img: mist,
  },
];

export const getImage = infoCuaca => {
  return gambar.find(w => w.cuaca === infoCuaca).img;
};
