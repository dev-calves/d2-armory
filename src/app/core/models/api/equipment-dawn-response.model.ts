import { IEquipmentTransferItem, IEquipmentItem } from './index';

export interface IEquipmentDawn {
    inventoryToVaultTransfers?: Array<IEquipmentTransferItem>,
    equipment?: Array<IEquipmentItem>,
    vaultToInventoryTransfers?: Array<IEquipmentTransferItem>
}