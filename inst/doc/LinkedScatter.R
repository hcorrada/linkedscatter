## ------------------------------------------------------------------------
library(linkedscatter)
library(ISLR)
data(Auto)

linkedscatter(Auto, y='mpg', x1='weight', x2='acceleration', tooltip='name')

