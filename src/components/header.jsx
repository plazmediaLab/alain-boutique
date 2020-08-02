import React from 'react';
import { motion, useCycle } from 'framer-motion';
import styled from '@emotion/styled';
import BtnToggleOpen from './nav-bar-toggle/btn-toggle-open';
import MenuContent from './nav-bar-toggle/navigation-menu';
// Images
import PlazmediaLogo from '../images/plazmedia-logo-ligth.svg';

const MotionDivToggle = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 350px;
    height: 100vh;
    background: #fff;
`;
const MotionDivToggleBackground = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
`;
const MenuContainer = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 350px;
`;

export default function Header({ location }){

  const title = () => {
    switch (location) {
      case '/app':
        return 'Inicio'
      case '/app/sales':
        return 'Productos'
      case '/app/sumary':
        return 'Resumen'
      case '/app/new':
        return 'Agregar'

      default:
        break
    }
  };

  const sidebar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        type: "spring",
        stiffness: 15,
        restDelta: 2
      }
    }),
    closed: {
      clipPath: "circle(0px at 32px 28px)",
      transition: {
        delay: 0.3,
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
  };
  const toggleVariants = {
    open: {
      opacity: 1,
      display: "initial"
    },
    closed: {
      opacity: 0,
      transitionEnd: {
        display: "none"
      },
      transition: {
        delay: 0.7
      }
    },
  };

  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <header className="header relative">
      <BtnToggleOpen toggle={() => toggleOpen()} isOpen={ isOpen }/>
      <h1 className="text-2xl text-center">{ title() }</h1>
      {/* BTN searh */}
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        // custom={height}
        // ref={containerRef}
        // style={{ display: `${!isOpen ? 'none' : ''}` }}
        variants={ toggleVariants }
      >
        <MenuContainer className="z-40">
          <MenuContent />
        </MenuContainer>
        <MotionDivToggle className={`shadow-menutoggle z-30`} variants={sidebar} >
          <footer className="flex justify-center items-center absolute w-full bottom-0 mb-5">
            <p className="text-carbon-200 text-sm">Created by</p>&nbsp;&nbsp;
            <img src={ PlazmediaLogo } alt="Plazmedia imagotype"/>
          </footer>
        </MotionDivToggle>
        <MotionDivToggleBackground
          className="bg-carbon-900 opacity-50 z-20"
          variants={sidebar}
          onClick={ () => toggleOpen() }
        />
        {/* <Navigation /> */}
      </motion.nav>
    </header>
  );
};