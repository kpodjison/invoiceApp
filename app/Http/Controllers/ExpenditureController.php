<?php

namespace App\Http\Controllers;

use App\Models\Expenditure;
use Illuminate\Http\Request;

class ExpenditureController extends Controller
{

        public function  index(){
        $expenditure = Expenditure::with('item')->orderBy('id', 'desc')->get();
        return response()->json(['data' => $expenditure]);
    }
       
    public function  show($id){
         $expenditure = Expenditure::with('item')->where('id','=',$id)->get();
        if(!$expenditure){
            return back()->with([
                'message' => 'Expenditure Not Found!!',
                'type'=>'error'
            ]);
        }
        return response()->json(['data' => $expenditure]);
    }
    
      public function store(Request $request){
        $request->validate([
            'name'=> 'required|string|max:100|exists:items,id',
            'amount'=> 'numeric|required',
            'description'=> 'string|max:100|nullable',
        ]);

        try{

            Expenditure::create([
                "item_id"=>$request->name,
                'amount'=> $request->amount,
                "description"=>$request->description ?? 'SPG expenses',
            ]);

            return back()->with('message', 'Expenditure Added successfully');
        }
        catch (\Exception $e){
            return back()->with([
                'message' => 'Failed to Add Expenditure',
                'type'=>'error'
            ]);
        }        
   } 

     public function update(Request $request){
      $request->validate([
        'item_id' => 'required|exists:items,id',
        'amount' => 'numeric|required',
        'description' => 'string|max:100|nullable',
    ]);
    // dd($request->all());

  
        try{

            $item =Expenditure::find($request->id);

            if (!$item) {
                return back()->with([
                    'message' => 'Failed to Update expenditure',
                    'type'=>'error'
                ]);
            }

            $item->update([
                "item_id"=>$request->name?? $request->id,
                'amount'=> $request->amount,
                "description"=>$request->description ?? 'SPG expenses',
            ]);

            return back()->with('message', 'expenditure Updated successfully');
        }
        catch (\Exception $e){
            return back()->with([
                'message' => 'Failed to Update expenditure',
                'type'=>'error'
            ]);
        }        
    }
}
