import { filterOptions } from "@/config";
import { Fragment } from "react";

function ProductFilter(){
    return (
        <div className="bg-background rounded-lg shadow-sm">
            <div className="p-4 border-b">
                <h2 className="text-lg font-extrabold">Filters</h2>
            </div>
            <div className="p-4 space-y-4">
                {
                   Object.keys(filterOptions).map(keyItem => <Fragment>
                          <h3 className="text-sm font-bold">{keyItem}</h3>
                          <ul className="space-y-2">
                            {
                                 filterOptions[keyItem].map((item) => <li key={item.id} className="flex items-center space-x-2">
                                      <input type="checkbox" id={item.id} name={item.id} className="rounded-sm border-gray-300" />
                                      <label htmlFor={item.id} className="text-sm">{item.label}</label>
                                 </li>)
                            }
                          </ul>
                   </Fragment>)
                }
            </div>

        </div>
    );
}

export default ProductFilter;