<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceItem extends Model
{
    use HasFactory;
    protected $fillable =['name','quantity','invoice_id'];

    public function Invoice(){
        return $this->belongsTo(Invoice::class);
    }
}
