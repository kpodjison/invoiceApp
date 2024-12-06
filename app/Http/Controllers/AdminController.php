<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Customer;
use App\Models\Expenditure;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rules;

class AdminController extends Controller
{
    public function loginForm(): Response
    {
        return Inertia::render('Auth/AdminLogin', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    public function registerForm(): Response
    {
        return Inertia::render('Auth/AdminRegister');
    }

    public function register(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.Admin::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $admin = Admin::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);


        Auth::login($admin);

        return redirect('/admin');
    }


    public function dashData(){
        try{

                $customers = Customer::all();
                $invoices = Invoice::all();
                $total = $invoices->sum('total');
                $expenditure = Expenditure::all();
                $totalExpenditure = $expenditure->sum('amount');

                $privateCustomers = ($customers->filter(fn($customer)=>$customer->type==='Private'))->count();
                $commercialCustomers = ($customers->filter(fn($customer)=>$customer->type==='Commercial'))->count();
                $customerChartData = [
                     [
                    'dtype' => 'Customers',
                    'dname' => 'privatecus',
                    'total' => $privateCustomers,
                    'fill' => 'var(--color-privatecus)',
                    ],
                    [
                        'dtype' => 'Customers',
                        'dname' => 'commercial',
                        'total' => $commercialCustomers,
                        'fill' => 'var(--color-commercial)',
                    ]
                ];

                $incomeChartData = [
                    [
                        "dtype"=> "Income",
                        "dname"=> "expenditure",
                        "total"=> $totalExpenditure,
                       "fill"=> "#ca8a04",
                    ],
                    [
                        "dtype"=> "Income",
                        "dname"=> "earnings",
                        "total"=> $total,
                       "fill"=> "#65a30d",
                    ]
                ];

           


            
            $dashData = [
                'customers' => $customers->count(),
                'invoices' => $invoices->count(),
                'total' => $total,
                'customerChartData'=>$customerChartData,
                'incomeChartData'=>$incomeChartData
            ];
            return response()->json(['data' => $dashData]);  
        } catch (\Exception $e){
            return back()->with([
                'message' =>'dash data fetch failed',
                'type'=> 'error'
            ]);

        }
        

      

    }


}
