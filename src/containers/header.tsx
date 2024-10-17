import { Drawer, Menu, MenuProps } from 'antd';
import { useAtom } from 'jotai';
import { useLocation, useNavigate } from 'react-router-dom';
import { tw } from 'twind';
import { localeAtom } from '../models/store';
import { MenuOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import { css } from 'twind/css';
import { ItemType } from 'antd/es/menu/interface';

// import en from "@/assets/en.svg";
// import zh from "@/assets/zh.svg";
// import fr from "@/assets/fr.svg";

// const IconMap = {
//   en: en,
//   zh: zh,
//   fr: fr,
// };

const Header = () => {
  const Menus = [
    // {
    //   label: {
    //     zh: '首页',
    //     en: 'Homepage',
    //     fr: 'Page d’acceuil',
    //   },
    //   path: '/',
    // },
    {
      label: {
        zh: '思想作品集',
        en: 'About the Artist',
        fr: 'A propos de l’Artiste',
      },
      path: '/thought-list',
    },
    {
      label: {
        zh: '艺术作品集',
        en: 'Artistic Works',
        fr: 'Œuvres d’art',
      },
      path: '/painting-list',
    },
    {
      label: {
        zh: '展讯集',
        en: 'UAFC Union',
        fr: 'Union UAFC',
      },
      path: '/news-list',
    },
    // {
    //   label: {
    //     zh: "海怪工作室",
    //     en: "Atelier Sea Monster",
    //     fr: "Atelier Sea Monster",
    //   },
    //   // path: "/personal-works",
    //   path: "/studio-info",
    // },
    // {
    //   label: {
    //     zh: "展讯",
    //     en: "Exhibition News",
    //     fr: "Actualités d’expositions",
    //   },
    //   path: "/exhibition-news",
    // },
    // {
    //   label: {
    //     zh: "联系方式",
    //     en: "Contact Information",
    //     fr: "Contact",
    //   },
    //   path: "/contract-info",
    // },
  ];

  // const options = [
  //   {
  //     label: "中文",
  //     value: "zh",
  //   },
  //   {
  //     label: "English",
  //     value: "en",
  //   },
  //   {
  //     label: "Français",
  //     value: "fr",
  //   },
  // ];

  const navigate = useNavigate();
  // const location = useLocation();
  const [locale] = useAtom(localeAtom);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  console.log(pathname);
  if (pathname === '/') {
    navigate('/thought-list');
  }

  console.log(pathname);
  const items: MenuProps['items'] = useMemo(() => {
    const res = Menus.map((menu) => {
      return {
        label: menu.label[locale],
        key: menu.path,
      };
    }) as ItemType[];

    return res;
    return [
      {
        label: '....',
        key: 'mail',
      },
      {
        label: 'Navigation Two',
        key: 'app',
      },
      {
        label: 'Navigation Three - Submenu',
        key: 'SubMenu',
        children: [
          {
            type: 'group',
            label: 'Item 1',
            children: [
              {
                label: 'Option 1',
                key: 'setting:1',
              },
              {
                label: 'Option 2',
                key: 'setting:2',
              },
            ],
          },
          {
            type: 'group',
            label: 'Item 2',
            children: [
              {
                label: 'Option 3',
                key: 'setting:3',
              },
              {
                label: 'Option 4',
                key: 'setting:4',
              },
            ],
          },
        ],
      },
      {
        label: (
          <a
            href="https://ant.design"
            target="_blank"
            rel="noopener noreferrer"
          >
            Navigation Four - Link
          </a>
        ),
        key: 'alipay',
      },
    ];
  }, [locale]);

  const onClose = () => {
    setOpen(false);
  };

  const menuClick = (e: any) => {
    console.log(e);
    navigate(e.key);
    setOpen(false);
  };

  const logout = () => {
    navigate('/login');
  };

  // const color = useMemo(() => {
  //   if (pathname === "/studio-info") {
  //     return {
  //       normal: "#fff",
  //       active: "#191B1C",
  //     };
  //   }
  //   return {
  //     normal: "#191B1C",
  //     active: "#fff",
  //   };
  // }, [pathname]);

  return (
    <div
      className={tw`flex h-[72px] justify-between items-center text-sm px-2 ${
        pathname === '/studio-info' ? 'text-frc-50' : 'text-frc-100'
      } ${pathname === '/studio-info' ? 'ant-studio' : ''}`}
    >
      <div className={tw`flex items-center w-full`}>
        <div
          className={tw`flex-1 w-full gap-2 text-frc-100 font-bold text-base ml-[20px] min-w-[1080px] hidden xl:flex
            ${css`
              .ant-menu {
                width: 100%;
                border-bottom: none;
              }
            `}
          `}
        >
          <Menu
            mode="horizontal"
            items={items}
            onClick={menuClick}
            activeKey={pathname}
            // defaultOpenKeys={["艺术作品"]}
          />
          {/* {Menus.map((menu) => (
            <div
              className={tw`cursor-pointer hover:text-underline
              ${
                location.pathname === menu.path
                  ? "text-underline text-frc-200"
                  : ""
              }
            `}
              onClick={() => {
                navigate(menu.path);
              }}
            >
              {menu.label[locale]}
            </div>
          ))} */}
        </div>
      </div>

      <div
        className={tw`flex
        ${css`
          button:focus,
          button:hover {
            outline: none;
            border: none;
          }
          button {
            border: none !important;
          }
        `}
      `}
      >
        <MenuOutlined
          className={tw`xl:hidden mr-[20px]`}
          onClick={() => setOpen(true)}
        />

        <div
          className={tw`w-[48px] flex justify-center items-center h-[36px] cursor-pointer hover:text-[#ffebc8]`}
          onClick={logout}
        >
          登出
        </div>
        {/* <div className={tw`w-[120px] flex gap-2`}>
          <span
            className={tw`px-1 border rounded-[4px] cursor-pointer border-[${
              color[locale === "zh" ? "active" : "normal"]
            }]`}
            onClick={() => {
              setLocale("zh");
            }}
          >
            中
          </span>
          /
          <span
            className={tw`px-1 border rounded-[4px] cursor-pointer border-[${
              color[locale === "en" ? "active" : "normal"]
            }]`}
            onClick={() => {
              setLocale("en");
            }}
          >
            EN
          </span>
          /
          <span
            className={tw`px-1 border rounded-[4px] cursor-pointer border-[${
              color[locale === "fr" ? "active" : "normal"]
            }]`}
            onClick={() => {
              setLocale("fr");
            }}
          >
            FR
          </span>
        </div> */}
        {/* <Button
          type="text"
          onClick={() => {
            console.log(currentRef.current);
            if (currentRef.current === 0) {
              setLocale("en");
            }

            if (currentRef.current === 1) {
              setLocale("fr");
            }

            if (currentRef.current === 2) {
              setLocale("zh");
            }
            if (currentRef.current !== 2) {
              currentRef.current = currentRef.current + 1;
            } else {
              currentRef.current = 0;
            }
          }}
        >
          <img className={tw`w-[24px]`} src={IconMap[locale]} />
        </Button> */}
        {/* <Select
          className={tw`w-[100px]`}
          options={options}
          value={locale}
          onChange={(v) => setLocale(v)}
        /> */}
      </div>

      <Drawer
        title=""
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
        key={'top'}
        getContainer={document.getElementById('root') as HTMLDivElement}
        className={tw`bg-frc-50 text-frc-100 ${css``}`}
      >
        <div className={tw`flex flex-col items-center`}>
          <Menu
            mode="inline"
            items={items}
            onClick={menuClick}
            // defaultOpenKeys={["艺术作品"]}
          />
          {/* {Menus.map((menu) => (
            <div
              className={tw`cursor-pointer h-[36px] hover:text-underline
              ${
                location.pathname === menu.path
                  ? "text-underline text-frc-200"
                  : ""
              }
            `}
              onClick={() => {
                setOpen(false);
                // navigate(menu.path);
              }}
            >
              {menu.label[locale]}
            </div>
          ))} */}
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
