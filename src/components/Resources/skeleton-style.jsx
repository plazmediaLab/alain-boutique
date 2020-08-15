import { css, keyframes } from '@emotion/core';

const shine = keyframes` {
	from 0% to {
		background-position: left -40px top 0;
  }
  60%{
    background-position: right 70% top 0;
  }
  80%{
    background-position: right 60% top 0;
  }
  100%{
    background-position: right -40px top 0;
  }
}
`

export const skeletonBackground = css`
  position: relative;
  overflow: hidden;

  &::after{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    /* background-image: linear-gradient(90deg, red, yellow); */
    background-position: left 20px top 0;
    background-size: 40px 100%;
    background-repeat: no-repeat;
    background-position: left -50px top 0;
    background-image: linear-gradient(
      90deg, 
      rgba(255, 255, 255, 0), 
      rgba(255, 255, 255, .4),
      rgba(255, 255, 255, 0)
    );
    animation: ${shine} 1s ease-in infinite;
  }
`;