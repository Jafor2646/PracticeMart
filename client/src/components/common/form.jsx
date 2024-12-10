import { Label } from "@radix-ui/react-label";
import { SelectTrigger } from "@radix-ui/react-select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
function CommonForm({formControl,formData, setFormData, onSubmit, buttonText}){

    function renderInputByComponentType(getControlItem){
        let element = null;
        const value = formData[getControlItem.name] || "";
        switch (getControlItem.commonType) {
            case "input":
                element = <Input 
                name={getControlItem.name}
                placeholder={getControlItem.placeholder}
                id={getControlItem.name}
                type={getControlItem.type}
                value={value}
                onChange={e=>setFormData({...formData, [getControlItem.name]: e.target.value})}
                />
                break;
            case "select":
                element = (
                    <Select onValueChange={(value) => setFormData({...formData, [getControlItem.name]:value,})}  value={value}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={getControlItem.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                getControlItem?.options.map(option=> <SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                );
                break;
            case "textarea":
                element = (
                    <Textarea 
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    id={getControlItem.id}
                    value={value}
                    onChange={e=>setFormData({...formData, [getControlItem.name]: e.target.value})} 
                    />
                );
                
                break;
            default:
                element = <Input 
                name={getControlItem.name}
                placeholder={getControlItem.placeholder}
                id={getControlItem.name}
                type={getControlItem.type}
                value={value}
                onChange={e=>setFormData({...formData, [getControlItem.name]: e.target.value})}
                />
                break;

        }
        return element;
    }
    return(
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {   formControl.map(controlItem=> (
                    <div className="grid w-full gap-1.5" key={controlItem.name}>
                        <Label className="mb-1" >{controlItem.label}</Label>
                        {renderInputByComponentType(controlItem)}
                    </div>
                ))}
            </div>
            <Button type="submit" className="mt-2 w-full">{buttonText || "Submit"}</Button>
        </form>
    );
}

export default CommonForm;