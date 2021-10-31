import { measurementUnit } from './consts';

export function measurementAbbreviation(measurement: measurementUnit): string {
    switch (measurement) {
        case measurementUnit.Liter:
            return 'lt';
        case measurementUnit.Kilogram:
            return 'kg';
        case measurementUnit.Unit:
            return 'un';
        default:
            break;
    }
}
