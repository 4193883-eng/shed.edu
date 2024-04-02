import {Card, CardBody} from "@chakra-ui/react";
import PropTypes from "prop-types";

export function LessonListItem({name}) {
  return <Card>
    <CardBody>
      {name}
    </CardBody>
  </Card>;
}

LessonListItem.propTypes = {
  name: PropTypes.string.isRequired
}
