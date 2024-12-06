<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ExpenditureController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\InstitutionController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ItemController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


/************************************ Admin routes *********************************/
Route::middleware('auth')->group(function () {

    Route::get('/admin',function (){   
        return Inertia::render('Admin/Admin');
    });
    Route::get('/admin/customers',function (){   
        return Inertia::render('Admin/Customers');
    });
    Route::get('/admin/expenditure',function (){   
        return Inertia::render('Admin/Expenditure');
    });
    Route::get('/admin/customers/{id}',function (){   
        return Inertia::render('Admin/SingleCustomer');
    });
    Route::get('/admin/company',function (){   
        return Inertia::render('Admin/Company');
    });
    Route::get('/admin/invoices',function (){   
        return Inertia::render('Admin/Invoices');
    });
    Route::get('/admin/invoices/{id}',function (){   
        return Inertia::render('Admin/SingleInvoice');
    });

    Route::get('/customers',[CustomerController::class,'index']);
    Route::post('/customers',[CustomerController::class,'store']);
    Route::get('/customers/{id}',[CustomerController::class,'show']);
    Route::patch('/customers/{id}',[CustomerController::class,'update']);


    Route::post('/items',[ItemController::class,'store']);
    Route::get('/items',[ItemController::class,'index']);
    Route::patch('/items',[ItemController::class,'update']);
    Route::get('/items/{id}',[ItemController::class,'show']);
    
    Route::post('/expenditure',[ExpenditureController::class,'store']);
    Route::get('/expenditure', [ExpenditureController::class, 'index']);
    Route::get('/expenditure/{id}', [ExpenditureController::class, 'show']);
    Route::patch('/expenditure', [ExpenditureController::class, 'update']);



    Route::get('/dash/data', [AdminController::class, 'dashData']);

    Route::get('/institution',[InstitutionController::class,'index']);
    Route::post('/institution',[InstitutionController::class,'store']);
    
    Route::get('/invoices',[InvoiceController::class,'index']);
    Route::get('/invoices/{id}',[InvoiceController::class,'show']);
    Route::post('/invoices',[InvoiceController::class,'store']);
    Route::patch('/invoices',[InvoiceController::class,'update']);
    Route::get('/invoices/latest',[InvoiceController::class,'currentInvoices']);
    
});



Route::get('/', function () {
    return redirect()->route('login');
});



require __DIR__.'/auth.php';
