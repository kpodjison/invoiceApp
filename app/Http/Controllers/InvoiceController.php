<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoiceItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class InvoiceController extends Controller
{
    public function  index(){

        $invoices = Invoice::orderBy('id', 'desc')->get();
        return response()->json(['data' => $invoices]);
    }

    public function store(Request $request){

            $request->validate([
                'invoice_date' => 'required|date',
                'description' => 'required|string|max:255', 
                'customer' => 'required|exists:customers,id', 
                'total' => 'required|numeric|min:0', 
                'fields.*.name' => 'required|string|max:100',
                'fields.*.quantity' => 'required|integer|min:1',
            ]);

        try{
           $invoice_number = 'SPGINV' . strval(time());

            $invoice = Invoice::create([
                'inv_num' => $invoice_number,
                'invoice_date' => $request->invoice_date,
                'description' => $request->description,
                'customer_id' => $request->customer,
                'total' => $request->total,
                'status' => 'Pending']);
                Log::info($request->fields);

                //add items
                foreach($request->fields as $item){
                    InvoiceItem::create([
                        "name" => $item['name'],
                        "quantity" => $item['quantity'],
                        "invoice_id" => $invoice->id,

                    ]);
                }

            return back()->with('message', 'Invoice Added successfully');
        }
        catch (\Exception $e){
         Log::info($e);
            return back()->with([
                'message' => 'Failed to Add Invoice',
                'type'=>'error'
            ]);
        }        
    }


    public function update(Request $request){

            $request->validate([
                'invoice_date' => 'required|date',
                'description' => 'required|string|max:255', 
                'customer_id' => 'required|exists:customers,id', 
                'total' => 'required|numeric|min:0', 
                'items.*.name' => 'required|string|max:100',
                'items.*.quantity' => 'required|integer|min:1',
            ]);

        try{

            $invoice =Invoice::find($request->id);

            if (!$invoice) {
                return back()->with([
                    'message' => 'Failed to Update Invoice',
                    'type'=>'error'
                ]);
            }

            $invoice->update([
                'invoice_date' => $request->invoice_date,
                'description' => $request->description,
                'total' => $request->total,
                'status' => 'Pending'
            ]);

            InvoiceItem::where('invoice_id', '=', $request->id)->delete();
           
            //add items
            foreach($request->items as $item){
                InvoiceItem::create([
                    "name" => $item['name'],
                    "quantity" => $item['quantity'],
                    "invoice_id" => $invoice->id,
                ]);
            }

            return back()->with('message', 'Invoice Updated successfully');
        }
        catch (\Exception $e){
         Log::info($e);
            return back()->with([
                'message' => 'Failed to Update Invoice',
                'type'=>'error'
            ]);
        }        
    }

    public function  show($id){
    $invoice = Invoice::where('id',$id)->with('customer','items')->get();
    if(!$invoice){
        return back()->with([
            'message' => 'Invoice Not Found!!',
            'type'=>'error'
        ]);
    }
    return response()->json(['data' => $invoice]);
}
}
