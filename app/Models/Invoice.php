<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;
    protected $fillable=['invoice_date','inv_num','description','customer_id','status','total'];
    
    public function customer(){
        return $this->belongsTo(Customer::class);
    }
     public function items(){
        return $this->hasMany(InvoiceItem::class);
    }
}
