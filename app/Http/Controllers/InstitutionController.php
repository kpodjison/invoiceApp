<?php

namespace App\Http\Controllers;

use App\Models\Institution;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InstitutionController extends Controller
{
    public function  index(){
        $inst = Institution::first();
        \Log::info($inst);
        return response()->json(['data' => $inst]);
    }

    public function store(Request $request){
        $rules = [

            'email' => 'required|string|lowercase|email|unique:institutions,email,'.$request->id.'|max:225',
            'name'=> 'required|string|max:60',
            "phone_number"=> 'required|string|max:15',
            'established_date' => 'required',
            'address'=> 'required|string|max:100',
            "website"=> 'string|max:50',
        ];

        if ($request->has('id')) {
            $rules['id'] = 'required|exists:institutions,id';
        }
        $request->validate($rules);

        try{

            DB::table('institutions')
                ->updateOrInsert(
                    ['email' => $request->email],
                    [
                        'name'=> $request->name,
                        "phone_number"=>$request->phone_number,
                        'established_date' => $request->established_date,
                        'address'=> $request->address,
                        "website"=> $request->website,

                    ]
                );

            return back()->with('message', !$request?->id ? 'Company Info Saved successfully' : 'Company Info Updated successfully');
        }
        catch (\Exception $e){
            \Log::info($e);
//
            return back()->with([
                'message' => 'Failed to Add Company',
                'type'=>'error'
            ]);
        }
    }

}
