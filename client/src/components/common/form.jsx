import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
function CommonForm({formControl,formData, setFormData, onSubmit, buttonText, isBtnDisabled}) {

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
                element = <Select className="bg-white" onValueChange={(value) => setFormData({...formData, [getControlItem.name]:value,})}  value={value}>
                        <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md p-2 flex justify-between items-center">
                            <SelectValue placeholder={getControlItem.label} />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50 shadow-lg border border-gray-200">
                            {
                                getControlItem?.options.map(option=> <SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                
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
            <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full bg-black text-white rounded-xl hover:text-black">{buttonText || "Submit"}</Button>
        </form>
    );
}

export default CommonForm;