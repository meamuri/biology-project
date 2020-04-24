package edu.vsu.flora.florest.florest.taxones.shema

enum class Frequency {
    DISAPPEARED, // вероятно исчезнувшие
    ENDANGERED,  // находящиеся под угрозой исчезновения
    SHRINKING,   // сокращающиеся в численности
    RARE,        // редкие
    RECOVERING,  // неопределенные по статусу
    UNDEFINED,   // восстанавливаемые и восстанавливающиеся
}
