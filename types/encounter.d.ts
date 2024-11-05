export type Encounter = {
  _id: string;
  name: string;
  location: string;
  close_encounter_level: string;
  extraterrestrial_type: string;
  image: string;
  url: string;
};

export interface EncounterProps {
  encounters: Encounter[];
}
