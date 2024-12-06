<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
        public function  index(){
        $items = Item::orderBy('id', 'desc')->get();
        return response()->json(['data' => $items]);
    }

    public function store(Request $request){
        $request->validate([
            'name'=> 'required|string|max:100|unique:items,name',
            'description'=> 'string|max:100|nullable',
        ]);

        try{

            Item::create([
                "name"=>$request->name,
                "description"=>$request->description ?? ' INVAPP'.' '.$request->name,
            ]);

            return back()->with('message', 'Item Added successfully');
        }
        catch (\Exception $e){
            return back()->with([
                'message' => 'Failed to Add Item',
                'type'=>'error'
            ]);
        }        
    } 
    
    public function update(Request $request){

        $request->validate([                
                'name' => 'required|string|max:100|unique:items,name,'.$request->id,

                'description' => 'string|max:100|nullable',
            ]);


        try{

            $item =Item::find($request->id);

            if (!$item) {
                return back()->with([
                    'message' => 'Failed to Update item',
                    'type'=>'error'
                ]);
            }

            $item->update([
                'name' => $request->name,
                'description' => $request->description,
            ]);

            return back()->with('message', 'item Updated successfully');
        }
        catch (\Exception $e){
            return back()->with([
                'message' => 'Failed to Update item',
                'type'=>'error'
            ]);
        }        
    }
     public function  show($id){
         $item = Item::find($id);
        if(!$item){
            return back()->with([
                'message' => 'Item Not Found!!',
                'type'=>'error'
            ]);
        }
        return response()->json(['data' => $item]);
    }
}
