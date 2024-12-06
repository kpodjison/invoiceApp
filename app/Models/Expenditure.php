<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expenditure extends Model
{
    /** @use HasFactory<\Database\Factories\ExpenditureFactory> */
    use HasFactory;
    protected $fillable = ['item_id','description','amount'];
       public function item(){
        return $this->belongsTo(Item::class);
    }

}
