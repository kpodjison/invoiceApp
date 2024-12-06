<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CustomerController extends Controller
{
       public function  index(){
        $allCustomers = Customer::orderBy('id', 'desc')->get();
        return response()->json(['data' => $allCustomers]);

    }

       public function store(Request $request){
        $request->validate([
            'name'=> 'required|string|max:100',
            'email'=> 'string|lowercase|email|max:255|unique:customers,email|nullable',
            'phone'=> 'required|string|max:50',
            'type'=> 'required|string|max:30',
            'street'=> 'required|string|max:70',
            'postcode'=> 'required|string|max:20',
            'city'=> 'required|string|max:20',
        ]);

        try{
           $customer_number = 'SPGCS' . strval(time());

            Customer::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'type' => $request->type,
                'street' => $request->street,
                'postcode' => $request->postcode,
                'city' => $request->city,
                 'cs_number' => $customer_number
            ]);

            return back()->with('message', 'Customer Added successfully');
        }
        catch (\Exception $e){
            return back()->with([
                'message' => 'Failed to Add Customer',
                'type'=>'error'
            ]);
        }        
    }

    public function  show($id){
        $customer = Customer::where('id',$id)->with('invoices')->get();
        if(!$customer){
            return back()->with([
                'message' => 'Customer Not Found!!',
                'type'=>'error'
            ]);
        }
        return response()->json(['data' => $customer]);
    }

     public function update(Request $request, $id){
        $request->validate([
            'name' => 'required|string|max:100',
            'email' => [
                'string',
                'email',
                'nullable',
                'max:255',
                Rule::unique('customers', 'email')->ignore($id),
            ],
            'phone' => 'required|string|max:50',
            'type' => 'required|string|max:30',
            'street' => 'required|string|max:70',
            'postcode' => 'required|string|max:20',
            'city' => 'required|string|max:20',
        ]);


        try {
            $customer =Customer::find($id);

            if (!$customer) {
                return back()->with([
                    'message' => 'Failed to Update customer',
                    'type'=>'error'
                ]);
            }

            $customer->update($request->all());

            return back()->with('message', 'Customer Updated successfully');

        } catch (\Exception $e) {
            return back()->with([
                'message' => 'Failed to Update Customer',
                'type'=>'error'
            ]);
        }
    }

}
