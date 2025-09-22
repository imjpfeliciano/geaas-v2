import React, { useState, useEffect, ChangeEvent } from 'react';
import Emoji from 'a11y-react-emoji';
import Canvas from './Canvas';
import { getFileURL, getImageFromURL, canvasToPNG } from './utils';
import {
  GlobalStyle,
  StyledAppWrapper,
  StyledContentWrapper,
  StyledTitle,
  StyledSubtitle,
  StyledHeader,
  StyledFieldset,
  StyledInput,
  StyledLink,
  StyledFooter,
} from './Styles';
import FaceCustomizationFilters from './components/FaceCustomizationFilters';
import Text from './components/Text';

const ghostWithFace = '/ghost.png';
const facelessGhost = '/faceless.png';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppProps {}

const width = 160;
const height = 160;

const App: React.FC<AppProps> = () => {
  const [ghost, setGhost] = useState<HTMLImageElement | null>(null);
  const [overlay, setOverlay] = useState<HTMLImageElement | null>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [scale, setScale] = useState(0.5);
  const [grayscale, setGrayscale] = useState(false);
  const [downloadURL, setDownloadURL] = useState('');
  const [showCircularSelection, setShowCircularSelection] = useState(false);
  const [borderRadius, setBorderRadius] = useState(50);

  const handleRefChange = (ref: HTMLCanvasElement) => ref && setDownloadURL(canvasToPNG(ref));

  const toggleGhost = async (event: ChangeEvent<HTMLInputElement>) => {
    const ghostImage = await getImageFromURL(event.target.checked ? ghostWithFace : facelessGhost);
    setGhost(ghostImage);
  };

  const toggleGrayscale = async (event: ChangeEvent<HTMLInputElement>) => {
    setGrayscale(event.target.checked);
  };

  const toggleCircularSelection = async (event: ChangeEvent<HTMLInputElement>) => {
    setShowCircularSelection(event.target.checked);
  };

  useEffect(() => {
    getImageFromURL(ghostWithFace).then((image) => setGhost(image));
  }, []);

  const setOverlayFromFileInput = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return '';
    const file = files.length === 1 ? files[0] : new File([], '');
    const fileURL = await getFileURL(file);
    const overlayImage = await getImageFromURL(fileURL);
    setOverlay(overlayImage);
    return fileURL;
  };

  return (
    <>
      <GlobalStyle />
      <StyledAppWrapper grayscale={grayscale}>
        <StyledContentWrapper>
          <StyledHeader>
            <StyledTitle data-testid="application-title">GEAAS</StyledTitle>
            <StyledSubtitle>
              <Emoji symbol="👻" label="ghost" /> Ghost Emoji As A Service
            </StyledSubtitle>
          </StyledHeader>
          <div className="flex flex-col justify-center w-[160px] h-auto m-auto">
            <Canvas
              className="w-full h-full"
              width={width}
              height={height}
              ghost={ghost}
              overlay={overlay}
              x={x}
              y={y}
              scale={scale}
              grayscale={grayscale}
              onCanvasChange={handleRefChange}
              circularSelection={showCircularSelection}
              borderRadius={borderRadius}
            />
          </div>

          <StyledFieldset>
            <Text fontWeight="bold">Step 1. Select Overlay Image</Text>
            <StyledInput type="file" onChange={setOverlayFromFileInput} accept=".png,.jpg" />
          </StyledFieldset>

          {overlay && (
            <FaceCustomizationFilters
              toggleGhost={toggleGhost}
              toggleGrayscale={toggleGrayscale}
              setX={setX}
              setY={setY}
              setScale={setScale}
              x={x}
              y={y}
              scale={scale}
              width={width}
              height={height}
              circularSelection={showCircularSelection}
              toggleCircularSelection={toggleCircularSelection}
              borderRadius={borderRadius}
              onChangeBorderRadius={setBorderRadius}
            />
          )}

          {overlay && (
            <StyledFieldset>
              <Text fontWeight="bold">Step 3. Profit!</Text>
              <StyledLink href={downloadURL} download="ghost-name.png">
                DOWNLOAD GHOST <Emoji symbol="👻" label="ghost" />
              </StyledLink>
            </StyledFieldset>
          )}
        </StyledContentWrapper>
        <StyledFooter>
          GitHub: <StyledLink href="https://github.com/tribakzero/geaas">tribakzero/geeas</StyledLink>
        </StyledFooter>
      </StyledAppWrapper>
    </>
  );
};

export default App;
