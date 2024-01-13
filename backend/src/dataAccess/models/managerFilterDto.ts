import paginationDto from "./paginationDto";

export default class managerFilterDto extends paginationDto{
    managerName!: string | null
    managerSurName!: string | null  

    constructor(obj : Partial<managerFilterDto>){
        super();        
        Object.assign(this, obj);
        this.setTakeAndSkip(this.take, this.skip)       
    }
}