import Link from "next/link";
import Image from "next/image";   //an optimized version of the basic <image/> component, add the imageUrl domain specified below to the next.config.js file
import { Flex, Box, Text, Button } from "@chakra-ui/react";   //chakra-ui is a UI framework for react (chakra-ui.com)

import Property from "../components/Property";
import { baseUrl, fetchApi } from "../utils/fetchApi";  // Next.js allows us to fetch the data by adding a function at the bottom of our code...

export const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl }) => (
  <Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='10'>
    <Image src={imageUrl} width={500} height={300} alt='banner' />
    <Box p='5'>
      <Text color='gray.500' fontSize='sm' fontWeight='medium'>{purpose}</Text>
      <Text fontSize='3xl' fontWeight='bold'>{title1}<br />{title2}</Text>
      <Text color='gray.700' fontSize='lg' paddingTop='3' paddingBottom='3' >{desc1}<br />{desc2}</Text>
      <Button fontSize='xl'>
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
);

const Home = ({ propertiesForSale, propertiesForRent }) => (
    <Box>
      <Banner 
        purpose='RENT A HOME'
        title1='Rental Homes for Everyone'
        title2='Dream Home'
        desc1='Explore Apartments, Villas, Homes'
        desc2='and more'
        buttonText='Explore Renting'
        linkName='/search?purpose=for-rent'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
      />
      <Flex flexWrap='wrap'>
        {/* Fetch the properties and map over them... */}
        {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}

      </Flex>
      <Banner 
        purpose='BUY A HOME'
        title1='Find, Buy & Own Your'
        title2='Dream Home'
        desc1='Explore Apartments, Villas, Homes'
        desc2='and more'
        buttonText='Explore Buying'
        linkName='/search?purpose=for-sale'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
      />
        <Flex flexWrap='wrap'>
          {/* Fetch the properties and map over them... */}
          {propertiesForSale.map((property) => <Property property={property} key={property.id} />)}
        </Flex>
    </Box>
  )

// use the Nextjs getStaticProps() function to fetch static data from api at build time
export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitPerPage=6`); //5002 is a required value for the param
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitPerPage=6`);

  return {
    //Next.js automatically adds these props to the props at the top of our code, so we can destructor them in the Home() params
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    }
  }
}

export default Home;
