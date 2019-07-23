import React, { useRef, useContext, useCallback } from 'react';
import { MiniSVG, FullExitSVG } from '../../../../svg';
import { vizWidth } from '../../../../constants';
import { getVizHeight } from '../../../../accessors';
import { VizRunnerContext } from '../../VizRunnerContext';
import { URLStateContext } from '../../URLStateContext';
import { VizPageDataContext } from '../../VizPageDataContext';
import { useDimensions } from '../useDimensions';
import { FooterIcon } from '../styles';
import { Wrapper, FullScreenFooter } from './styles';

export const FullScreen = () => {
  const wrapperRef = useRef();
  const { setVizRunnerTransform } = useContext(VizRunnerContext);

  const { visualization } = useContext(VizPageDataContext);

  const { exitFullScreen, enterMini } = useContext(URLStateContext);

  const vizHeight = getVizHeight(visualization);

  // Shrink and grow to fill available width and height.
  const setDomRect = useCallback(
    ({ width, height }) => {
      const vizAspect = vizWidth / vizHeight;
      const aspect = width / height;
      let x, y, scale;
      if (vizAspect > aspect) {
        scale = width / vizWidth;
        x = 0;
        y = height / 2 - (scale * vizHeight) / 2;
      } else {
        scale = height / vizHeight;
        x = width / 2 - (scale * vizWidth) / 2;
        y = 0;
      }
      setVizRunnerTransform({ x, y, scale });
    },
    [setVizRunnerTransform, vizHeight]
  );

  useDimensions({ wrapperRef, setDomRect });

  return (
    <Wrapper ref={wrapperRef}>
      <FullScreenFooter>
        <FooterIcon leftmost={true} onClick={enterMini}>
          <MiniSVG />
        </FooterIcon>
        <FooterIcon rightmost={true} onClick={exitFullScreen}>
          <FullExitSVG />
        </FooterIcon>
      </FullScreenFooter>
    </Wrapper>
  );
};
