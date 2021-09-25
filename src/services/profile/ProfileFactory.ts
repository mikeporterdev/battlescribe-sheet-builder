import { BSCharacteristic, BSProfile, Profile, TypeName } from "../types";
import {
  isBSAbilitiesProfile,
  isBSExplosionProfile,
  isBSPsychicPowerProfile,
  isBSPsykerProfile,
  isBSTransportProfile,
  isBSUnitProfile,
  isBSWeaponProfile,
  isBSWoundTrackProfile,
} from "../guards";
import WeaponProfileConverter from "./WeaponProfileConverter";
import AbstractProfileConverter from "./AbstractProfileConverter";
import UnitProfileConverter from "./UnitProfileConverter";
import AbilityProfileConverter from "./AbilityProfileConverter";
import WoundTrackProfileConverter from "./WoundTrackProfileConverter";
import TransportProfileConverter from "./TransportProfileConverter";
import PsychicPowerProfileConverter from "./PsychicPowerProfileConverter";
import PsykerProfileConverter from "./PsykerProfileConverter";
import ExplosionProfileConverter from "./ExplosionProfileConverter";
import UnknownProfileConverter from "./UnknownProfileConverter";

class ProfileFactory {
  static getProfile(bsProfile: BSProfile<BSCharacteristic>): Profile<TypeName> {
    let converter: AbstractProfileConverter<
      Profile<TypeName>,
      BSCharacteristic
    >;

    if (isBSWeaponProfile(bsProfile)) converter = new WeaponProfileConverter();
    else if (isBSUnitProfile(bsProfile)) converter = new UnitProfileConverter();
    else if (isBSAbilitiesProfile(bsProfile))
      converter = new AbilityProfileConverter();
    else if (isBSWoundTrackProfile(bsProfile))
      converter = new WoundTrackProfileConverter();
    else if (isBSTransportProfile(bsProfile))
      converter = new TransportProfileConverter();
    else if (isBSPsychicPowerProfile(bsProfile))
      converter = new PsychicPowerProfileConverter();
    else if (isBSPsykerProfile(bsProfile))
      converter = new PsykerProfileConverter();
    else if (isBSExplosionProfile(bsProfile))
      converter = new ExplosionProfileConverter();
    else
      converter = new UnknownProfileConverter(
        (bsProfile as { $: { typeName: string } }).$.typeName,
      );

    return converter.convert(bsProfile);
  }
}

export default ProfileFactory;
