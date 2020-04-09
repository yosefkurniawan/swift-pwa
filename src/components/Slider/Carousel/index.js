import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import Item from "./Item";
import useStyles from "./style";
import Typography from "@components/Typography";
import { Grid } from "@material-ui/core";

const Caraousel = ({ data = [1, 2, 3], title = "" }) => {
  const styles = useStyles();
  const [index, setIndex] = useState(parseInt(data.length / 2));
  return (
    <div className={styles.container}>
      {title && title !== "" && (
        <Typography
          align="center"
          letter="uppercase"
          type="bold"
          variant="span"
          className={styles.title}
        >
          {title}
        </Typography>
      )}
      <SwipeableViews
        className={styles.caraousel}
        slideClassName={styles.slideContainer}
        index={index}
        onChangeIndex={index => setIndex(index)}
        enableMouseEvents={true}

      >
        {data.map((item, index) => (
          <Item {...item} key={index} />
        ))}
      </SwipeableViews>
    </div>
  );
};

// const Caraousel = ({ data = [], title = "" }) => {
//   const styles = useStyles();
//   const [index, setIndex] = useState(parseInt(data.length / 2));
//   return (
//     <div className={styles.container}>
//       {title && title !== "" && (
//         <Typography
//           align="center"
//           letter="uppercase"
//           type="bold"
//           variant="span"
//           className={styles.title}
//         >
//           {title}
//         </Typography>
//       )}
//       <Grid container wrap="nowrap" style={{
//         overflow : 'auto'
//       }}>
//         {data.map(item => (
//           <Grid item xs={10} sm={6} lg={4} item key={item}>
//             <Item />
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// };

export default Caraousel;
