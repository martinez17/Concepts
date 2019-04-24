{-
 - You can load (and reload) this file in the interpreter with the command: 
 -  ":l lab3.hs" (that is a lowercase L after the colon)
 -
 - Work on this file at the end of each chapter starting at chapter 2.
 -
 - Your edited version of this file is your turn in for lab 3.
 -
 - Many of these problems are from the following web site:
 -    https://github.com/noelmarkham/learn-you-a-haskell-exercises
 - 
 - If you continue with the tutorial, feel free to use them to help you gain
 - a better understanding of Haskell.
 -}

-- CHAPTER 2

-- Find the penultimate (next to last) element in list l
-- Example: "penultimate [1,2,3,4]" would return 3
penultimate num = last(init num)

-- Given a number n, generate a list of numbers where the odd numbers from
-- 1 to n are multipied by 3.
-- Example: odd3 5 = [3,9,15]   I.E. [1*3, 3*3, 5*3]
odd3 n = [x*3 | x <- [1,3..n]]

-- CHAPTER 3
-- This chapter will show up in the future chapters, but no exercises.

-- CHAPTER 4

-- This function should print a single digit number as English text, or
-- "unknown" if it's out of the range 0-9
-- Example: englishDigit 1 = "One"
englishDigit :: Int -> String

englishDigit x = 
    if x >= 0 && x <= 9 then 
        ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"] !! x
    else "Unknown"

-- if the first three numbers in a list are all zero, return True else False
-- Example: threeZeroList [0,0,0,1,2,3] = True
threeZeroList :: [Int] -> Bool
threeZeroList [] = False
threeZeroList (0:0:0:_) = True
threeZeroList [x] = False

-- CHAPTER 5

-- Raise x to the power y, using recursion
-- Example: power 5 2 = 25
power :: Int -> Int -> Int
power x 0 = 1
power x 1 = x
power x y = power (x*x) (y - 1)

-- Create a list of length n of the fibbonaci sequence in reverse order
-- The Fibonacci sequence is a set of numbers that starts with a one or a
-- zero, followed by a one, and proceeds based on the rule that each number
-- Examples: fib 0 = [0]
-- 	     fib 1 = [1, 0]
--	     fib 10 = [55,34,21,13,8,5,3,2,1,1,0]	
-- try to use a where clause
fib :: (Num a, Eq a) => a -> [a]

fib 0 = [0]
fib 1 = [1, 0]
fib x = (a + b) : l
    where l@(a:b:t) = fib (x - 1)
-- CHAPTER 6

{-
 - The first few problems are not higher order functions.  They show the
 - problems you will work with with higher order functions allowing you
 - to compair and contranst the two implementations.
 -}

-- Sum the numbers between two inclusive values recursively, 
-- assuming a < b when the function is first called
-- Example: sumInts 0 1 = 1
--          sumInts 1 3 = 6
sumInts :: Int -> Int -> Int
sumInts a b | a <= b = a + sumInts (a+1) b
            | otherwise = 0

-- Define a square function
sq :: Int -> Int
sq n = aux n
 where
  aux x
    | x*x > n = aux (x - 1)
    | otherwise = x

-- Sum the squares between two numbers. This function should be similar to the sumInts function
sumSquares :: Int -> Int -> Int
sumSquares a b | a <= b = a^2 + sumSquares (a+1) b
            | otherwise = 0

-- Define a higher order sum function which accepts an (Int -> Int) function to apply to all integers between two values.
-- Again this should look similar to the sumInts and sumSquares functions
higherOrderSum :: (Int -> Int) -> Int -> Int -> Int
higherOrderSum intApplication a b
    | a < b = intApplication a + (higherOrderSum (intApplication) (a+1) (b))
    | otherwise = intApplication a

-- Define the square sum in terms of higherOrderSum
hoSumSquares :: Int -> Int -> Int
hoSumSquares a b 
    | a < b = (higherOrderSum(*a) (a) (a)) + hoSumSquares (a+1) b
    | otherwise = a * a

-- Define the sum between two values in terms of higherOrderSum
-- Note there is no parameter on the function definition
-- Try to use a lambda if possible
hoSumInts :: Int -> Int -> Int
hoSumInts = \a -> \b -> higherOrderSum (+0) a b
