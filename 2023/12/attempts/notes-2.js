// Input: ????.######..#####. 1,6,5
// ---------------------------------------
// All Matching
// MMMMM -> 1024
// --------------------------------------- 1024
// 1 Non-Matching
// MMMMN -> 256 [['.', '.', '.', '#']]
// MMMNM -> 256 [['.', '.', '#', '.']]
// MMNMM -> 256 [['.', '#', '.', '.']]
// MNMMM -> 256 [['#', '.', '.', '.']]
// NMMMM -> 0
// --------------------------------------- 2048
// 2 Non-Matching
// MNNMM -> 64 [['#', '#', '.', '.']]
// MMNNM -> 64 [['.', '#', '#', '.']]
// MMMNN -> 64 [['.', '.', '#', '#']]
// MNMNM -> 64 [['#', '.', '#', '.']]
// NMMMN -> 0
// NMMNM -> 0
// NNMMM -> 0
// NMNMM -> 0
// MNMMN -> 64 [['#', '.', '.', '#']]
// MMNMN -> 64 [['.', '#', '.', '#']]
// --------------------------------------- 2432
// 3 Non-Matching
// NMMNN -> 0
// NNMMN -> 0
// NNNMM -> 0
// NMNMN -> 0
// MNNNM -> 16 [['#', '#', '#', '.']]
// MNNMN -> 16 [['#', '#', '.', '#']]
// MMNNN -> 16 [['.', '#', '#', '#']]
// MNMNN -> 16 [['#', '.', '#', '#']]
// NMNNM -> 0
// NNMNM -> 0
// --------------------------------------- 2496
// 4 Non-Matching
// NNNNM -> 0
// NNNMN -> 0
// NNMNN -> 0
// NMNNN -> 0
// MNNNN -> 4 [['#', '#', '#', '#']]
// --------------------------------------- 2500
