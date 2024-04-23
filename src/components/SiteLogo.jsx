import { Image } from '@chakra-ui/react';
import {Link} from "react-router-dom";

export function SiteLogo() {

  return <Link to={'/'}><Image src={'/logo.svg'} height={50} width={200} /></Link>;
}
