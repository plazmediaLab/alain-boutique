import { css, keyframes } from '@emotion/core';

const lineWidth = 25;
const lineWidthMin = 13;
const lineWidthMax = 15;
const lineHeight = 3;
const lineHeightMin = 2.8;
const gap = 8;
const Transition = .1;
const speedAnimate = .6;
const translateX = 50;

const animateBtn = keyframes`
  from, 0%, to {
    transform: translateX(0px)
  }
  30% {
    transform: translateX(${ translateX }px)
  }
  70% {
    transform: translateX(-${ translateX - 35 }px)
  }
  90% {
    transform: translateX(${ translateX - 45 }px)
  }
  100% {
    transform: translateX(0)
  }
`;

export const btnAnimateIcon = css` 
  background-color: transparent;
  width: 45px;
  height: 45px;

  > span{
    background-color: #494D4F;
    opacity: 1;
    position: absolute;
    top: calc(50% - 1.5px);
    left: calc(50% - 12.5px);
    content: '';
    width: ${ lineWidth }px;
    height: ${ lineHeight }px;
    border-radius: 2px;
    transition: all ${ Transition }s ease-in-out;
  }
  > span::before{
    background-color: #494D4F;
    opacity: 1;
    position: absolute;
    top: -${ gap }px;
    left: calc(50% - 12.5px);
    content: '';
    width: ${ lineWidth }px;
    height: ${ lineHeight }px;
    border-radius: 2px;
    transition: all ${ Transition }s ease-in-out;
  }
  > span::after{
    background-color: #494D4F;
    opacity: 1;
    position: absolute;
    top: ${ gap }px;
    left: calc(50% - 12.5px);
    content: '';
    width: ${ lineWidthMin }px;
    height: ${ lineHeight }px;
    border-radius: 2px;
    transition: all ${ Transition }s ease-in-out;
  }


  span.active{
    animation: ${ animateBtn } ${ speedAnimate }s ease-in-out forwards
  }
  span.active::before{
    height: ${ lineHeightMin }px;
    width: ${ lineWidthMax }px;
    transform: rotate(-45deg);
    top: -4px;
    left: -2px;
  }
  span.active::after{
    height: ${ lineHeightMin }px;
    width: ${ lineWidthMax }px;
    transform: rotate(45deg);
    top: 5px;
    left: -2px;
  }
`;