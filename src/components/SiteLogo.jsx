import { Image } from '@chakra-ui/react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

export function SiteLogo({isLight = true}) {
  return <Link to={'/'}><Image src={isLight? '/logo.svg' : '/logo_black.svg'} height={50} width={200} /></Link>;
}

SiteLogo.propTypes = {
  isLight: PropTypes.bool
}
