<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    protected $fillable=['name','cs_number','email','phone','type','street','postcode','city',];

    public function Invoices(){
        return $this->hasMany(Invoice::class);
    }
}
