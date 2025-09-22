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
  StyledInputsWrapper,
  StyledHalfLabel,
  StyledThirdLabel,
  StyledInput,
  StyledBlockInput,
  StyledLink,

} from './Styles';


const ghostWithFace = "/ghost.png";
const facelessGhost = "/faceless.png";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppProps {}

const App: React.FC<AppProps> = () => {
  const width = 160;
  const height = 160;
  const [ghost, setGhost] = useState<HTMLImageElement | null>(null);
  const [overlay, setOverlay] = useState<HTMLImageElement | null>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [scale, setScale] = useState(0.5);
  const [grayscale, setGrayscale] = useState(false);
  const [downloadURL, setDownloadURL] = useState('');

  const handleRefChange = (ref: HTMLCanvasElement) => ref && setDownloadURL(canvasToPNG(ref));

  const toggleGhost = async (event: ChangeEvent<HTMLInputElement>) => {
    const ghostImage = await getImageFromURL(event.target.checked ? ghostWithFace : facelessGhost);
    setGhost(ghostImage);
  };

  const toggleGrayscale = async (event: ChangeEvent<HTMLInputElement>) => {
    setGrayscale(event.target.checked);
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
            <StyledTitle data-testid="application-title">GEAAS-V2</StyledTitle>
            <StyledSubtitle>
              <Emoji symbol="👻" label="ghost" /> Ghost Emoji As A Service
            </StyledSubtitle>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}>
              Version 2.0.0 - This project is a fork of the original GEAAS project by tribakzero.
              <span>
              GitHub: <StyledLink href="https://github.com/tribakzero/geaas">tribakzero/geeas</StyledLink>
              </span>

            </div>
          </StyledHeader>
          <Canvas
            width={width}
            height={height}
            ghost={ghost}
            overlay={overlay}
            x={x}
            y={y}
            scale={scale}
            grayscale={grayscale}
            onCanvasChange={handleRefChange}
          />
          <StyledFieldset>
            <legend>Step 1. Select Overlay Image</legend>
            <StyledInput type="file" onChange={setOverlayFromFileInput} accept=".png,.jpg" />
          </StyledFieldset>

          {overlay && (
            <StyledFieldset>
              <legend>Step 2. Face customization</legend>
              <StyledInputsWrapper>
                <StyledHalfLabel>
                  Ghost Face:
                  <StyledInput type="checkbox" defaultChecked={true} onChange={toggleGhost} />
                </StyledHalfLabel>

                <StyledHalfLabel>
                  Grayscale:
                  <StyledInput type="checkbox" defaultChecked={false} onChange={toggleGrayscale} />
                </StyledHalfLabel>

                <StyledThirdLabel>
                  Offset X:
                  <StyledBlockInput
                    type="range"
                    min={-width}
                    max={width}
                    value={x}
                    onChange={(event) => setX(parseInt(event.target.value))}
                  />
                </StyledThirdLabel>

                <StyledThirdLabel>
                  Offset Y:
                  <StyledBlockInput
                    type="range"
                    min={-height}
                    max={height}
                    value={y}
                    onChange={(event) => setY(parseInt(event.target.value))}
                  />
                </StyledThirdLabel>

                <StyledThirdLabel>
                  Scale:
                  <StyledBlockInput
                    type="range"
                    min="0"
                    max={1}
                    step="0.01"
                    value={scale}
                    onChange={(event) => setScale(parseFloat(event.target.value))}
                  />
                </StyledThirdLabel>
              </StyledInputsWrapper>
            </StyledFieldset>
          )}

          {overlay && (
            <StyledFieldset>
              <legend>Step 3. Profit!</legend>
              <StyledLink href={downloadURL} download="ghost-name.png">
                DOWNLOAD GHOST <Emoji symbol="👻" label="ghost" />
              </StyledLink>
            </StyledFieldset>
          )}
        </StyledContentWrapper>
      </StyledAppWrapper>
    </>
  );
};

export default App;
