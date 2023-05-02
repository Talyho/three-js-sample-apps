import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { useConfigurator } from "./../contexts/Configurator";
export const Interface = () => {
  const { windowCount, setwindowCount, doors, setDoorCount, doorsColor, setDoorCountColor } =
    useConfigurator();

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
      }}
      p={3}
    >
      <Stack spacing={3}>
        <Typography variant="caption">House Configurator</Typography>
        <Box className="glass" p={3}>
          <FormControl>
            <FormLabel>Number of windows</FormLabel>
            <Slider
              sx={{
                width: "200px",
              }}
              min={1}
              max={10}
              value={windowCount}
              onChange={(e) => setwindowCount(e.target.value)}
              valueLabelDisplay="auto"
            />
          </FormControl>
          
        </Box>
        <Box className="glass" p={3}>
        <FormControl>
            <FormLabel>Number of Doors</FormLabel>
            <Slider
              sx={{
                width: "200px",
              }}
              min={1}
              max={10}
              value={doors}
              onChange={(e) => setDoorCount(e.target.value)}
              valueLabelDisplay="auto"
            />
          </FormControl>
          </Box>
      </Stack>

      
    </Box>
  );
};
