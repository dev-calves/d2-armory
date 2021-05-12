import { Item }  from './item.model'

export interface IEquipment {
        Kinetic_Weapons: Array<Item>,
        Energy_Weapons: Array<Item>,
        Power_Weapons: Array<Item>,
        Helmet: Array<Item>,
        Gauntlets: Array<Item>,
        Chest_Armor: Array<Item>,
        Leg_Armor: Array<Item>,
        Class_Armor: Array<Item>,
        Ghost: Array<Item>,
        Subclass: Array<Item>
    }