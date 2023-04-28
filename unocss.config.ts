import type { UserConfig } from '@unocss/core';
import presetUno from '@unocss/preset-uno';
import presetWebFonts from '@unocss/preset-web-fonts';

const darkerGray = '#1b1b1b';
const darkGray = '#333';
const gray = '#888';
const offWhite = '#faf9f6';

// @ref https://github.com/unocss/unocss#configurations
export default <UserConfig>{
  presets: [
    presetUno(),
    presetWebFonts({
      fonts: { sans: 'Inter:300' }
    })
  ],
  theme: {
    colors: {
      darkerGray,
      darkGray,
      gray,
      offWhite,
      white: '#fff'
    }
  },
  preflights: [
    {
      getCSS: ({ theme }) => `
      .scrollbar {
        scrollbar-color: transparent;
        scroll-behavior: smooth;
      }

      .scrollbar::-webkit-scrollbar-track {
        background-color: transparent;
        border-radius: 6px;
      }
      .scrollbar::-webkit-scrollbar-thumb {
        background-color: ${darkGray};
        border-radius: 6px;
      }

      .scrollbar-horizontal::-webkit-scrollbar {
        height: 8px;
      }

      .scrollbar-vertical::-webkit-scrollbar {
        width: 8px;
      }
      `
    }
  ]
};
