class FieldValidator{ 
    constructor(txtId, validatorFunc){
        this.input = $(`#${txtId}`);
        this.tip = this.input.nextElementSibling
        this.validatorFunc = validatorFunc;
        this.input.onblur = ()=>{//失去焦点的时候注册事件
            this.validate();
        }
    }

    async validate(){//验证函数
        const err = await this.validatorFunc(this.input.value);
        if(err) {
            this.tip.innerText = err
            return false;
        }else{
            this.tip.innerText = ''
            return true
        }
    }

    static async validateAll(...args){
        const items = args.map(item => item.validate());
        const result = await Promise.all(items);
        return result.every(item => item)
    }
}