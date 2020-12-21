import React, {useState} from 'react';
import Img from "gatsby-image"
import { Flex, Box } from 'rebass';
import styled from 'styled-components';

const ThumbnailBox = styled(Box)(() => ({
    transition: '0.5s ease all',
    cursor: 'pointer',
}));

const ThumbnailFlex = styled(Flex)(() => ({
    transition: '0.5s ease all',
}));

const Gallery = ({ product }) => {
    const [currentImage, setCurrentImage] = useState(product.images[0]);

    return (
        <>
            <Box
                width={[2 / 2, null, .5 / 5]}
                py={2}
                px={[2, null, 0]}
                order={[2, null, 1]}
            >
                <Box
                    width={'100%'}
                    aria-hidden
                    style={{ overflow: 'auto' }}
                >
                    <ThumbnailFlex
                        flexDirection={['row', null, 'column']}
                    >
                        {product.images.map((x, i) => (
                            currentImage === product.images[i] ?
                                <ThumbnailBox
                                    key={i}
                                    style={{ marginBottom: "1rem", border: "3px solid black" }}
                                    width={['400px', null, 'auto']}
                                    ml={[0, null, 2]}
                                    mr={[2, null, 0]}
                                    my={1}
                                >
                                    <Img
                                        fluid={{...x.localFile.childImageSharp.fluid, aspectRatio: 1 / 1}}
                                        imgStyle={{ filter: "grayscale(80%)", marginBorder: "0.3rem solid black", objectFit: "contain" }}
                                        alt={product.title}
                                        fadeIn={true} 
                                        loading="eager"
                                    />
                                </ThumbnailBox>
                                :
                                <ThumbnailBox
                                    onMouseOver={e => setCurrentImage(product.images[i])} style={{ marginBottom: "1rem" }}
                                    key={i}
                                    width={['400px', null, 'auto']}
                                    ml={[0, null, 2]}
                                    mr={[2, null, 0]}
                                    my={1}
                                >
                                    <Img
                                        fluid={{...x.localFile.childImageSharp.fluid, aspectRatio: 1 / 1}}
                                        imgStyle={{ objectFit: "contain" }}
                                        fadeIn={true} 
                                        loading="eager"
                                        alt={product.title}

                                    />
                                </ThumbnailBox>
                        ))}
                    </ThumbnailFlex>
                </Box>
            </Box>

            <Box
                width={[5 / 5, null, 3 / 5]}
                style={{ margin: "0" }}
                ml="auto"
                py={2}
                px={[2, null, 3]}
                order={[1, null, 2]}
                className="img-hover-zoom--zoom-n-rotate img-hover-zoom"
            >
                <Img
                    fluid={{...currentImage.localFile.childImageSharp.fluid, aspectRatio: 1 / 1}}
                    imgStyle={{ objectFit: "contain" }}
                    key={currentImage.localFile.id}
                    alt={product.title}
                    fadeIn={false} 
                    loading="eager"
                    className="imgProduct"
                />
            </Box>
        </>
    );
};

export default Gallery;