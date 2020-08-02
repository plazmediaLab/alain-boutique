import React, { useContext } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import useAuthMethods from "../../hooks/useAuthMethods";
import UserContext from "../../context/user/UserContext";
// Images 
import PerfilDefaultImage from '../../images/perfil-default-img.png';

const MotionUL = styled(motion.ul)`
  width: 350px;
  padding-top: 4rem;
`;
const SectionAvatar = styled.section`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
`;

const variantsUL = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};
const variantsLI = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    },
    styled: { 
      border: `2px solid red`,
      display: 'none'
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    },
  },
};

const NavigationMenu = ( ) => {

  const { logOut } = useAuthMethods();

  const userContext = useContext(UserContext);
  const { user } = userContext;

  return (
    <MotionUL 
      variants={variantsUL}
      initial={"hidden"}
    >
      <motion.div 
        variants={variantsLI}
        className=""
      >
        <SectionAvatar className="p-2 pl-4 items-center">
          <img src={user.photo ? user.photo : PerfilDefaultImage} alt="Avatar Google" className="w-10 h-10 rounded-full bg-white"/>
          <div>
            <p className="text-p_blue-500">{user.name}</p>
            <p className="text-xs text-carbon-200">{user.email}</p>
          </div>
        </SectionAvatar>
      </motion.div>
      <div className="grid">
        {/* <motion.li
          variants={variantsLI}
          className="menu-toggle-item hover:bg-background hover:border-p_blue-500 cursor-pointer"
        >
          <p>Item 1</p>
        </motion.li>
        <motion.li
          variants={variantsLI}
          className="menu-toggle-item hover:bg-background hover:border-p_blue-500 cursor-pointer"
        >
          <p>Item 2</p>
        </motion.li>
        <motion.li
          variants={variantsLI}
          className="menu-toggle-item hover:bg-background hover:border-p_blue-500 cursor-pointer"
        >
          <p>Item 3</p>
        </motion.li> */}
        <motion.li
          variants={variantsLI}
          className="menu-toggle-item"
        >
          <hr className="border-bluegray-100"/>
          <button 
            className="py-2 px-4 border border-red-600 bg-transparent text-red-600 text-sm rounded-full mt-3 w-full hover:bg-red-600 hover:text-white"
            onClick={logOut}
          >
            Cerrar sesión
          </button>
        </motion.li>
      </div>
    </MotionUL>
  )
};

export default NavigationMenu;