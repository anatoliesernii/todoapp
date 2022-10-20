import React from "react";
import styled from "styled-components";

const Footer = () => {
   const date = new Date().getFullYear();

   return (
      <>
         <FooterWrapper>
            <h2>© Anatolie Sernii {date}</h2>
         </FooterWrapper>
      </>
   );
};

const FooterWrapper = styled.footer`
   position: absolute;
   bottom: 0;
   width: 100%;
   padding: 10px 0;
   text-align: center;
   color: black;
   background-color: #fdfdfe;
`;

export default Footer;
