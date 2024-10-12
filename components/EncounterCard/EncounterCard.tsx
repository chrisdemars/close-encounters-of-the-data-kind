import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

type Encounter = {
  _id: string;
  name: string;
  location: string;
  close_encounter_level: string;
  extraterrestrial_type: string;
  image: string;
  url: string;
};

interface EncounterProps {
  encounters: Encounter[];
}


const EncounterCard: React.FC<EncounterProps> = ({ encounters }) => {
  return (
    <>
      {encounters.map((encounter) => {
        return (
          <Card key={encounter._id} sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              sx={{ height: 140 }}
              image={encounter.image}
              alt={encounter.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {encounter.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {encounter.location}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {encounter.close_encounter_level}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Species: {encounter.extraterrestrial_type}
              </Typography>
            </CardContent>
            <CardActions>
              <Link href={encounter.url} target="_blank" rel="noopener noreferrer">{encounter.name} Info</Link>
            </CardActions>
          </Card>
        );
      })}
    </>
  );
};

export default EncounterCard;


