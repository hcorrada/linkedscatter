#' linkedscatter-package
#'
#' @import htmlwidgets
#' @docType package
#' @name linkedscatter
NULL

#' linkedscatter
#'
#' Create a pair of coordinated scatter plots
#'
#' @export
linkedscatter <- function(data, y=NULL, x1=NULL, x2=NULL, tooltip=NULL, key=NULL, width = NULL, height = NULL) {
  names <- colnames(data)

  # if y is missing, use the first column in data
  if (missing(y)) {
    y <- names[1]
  }

  # if x1 is missing, use the first column in data
  if (missing(x1)) {
    x1 <- names[1]
  }

  # if x2 is missing, use the first column in data
  if (missing(x1)) {
    x2 <- names[1]
  }

  # if 'tooltip' is missing, use the third column in data
  if (missing(tooltip)) {
    tooltip <- names[1]
  }

  # if 'key' is missing, use rowindex as key
  if (missing(key)) {
    data$key <- seq_len(nrow(data))
    key <- "key"
    names <- c(names, "key")
  }

  # check the names are in the dataframe
  stopifnot((x1 %in% names) &&
              (x2 %in% names) &&
              (y %in% names) &&
              (tooltip %in% names) &&
              (key %in% names))

  # forward options using x
  bindings = list(
    data = data,
    x1 = x1,
    x2 = x2,
    y = y,
    tooltip = tooltip,
    key = key
  )

  # create widget
  htmlwidgets::createWidget(
    name = "linkedscatter",
    bindings,
    width = width,
    height = height,
    package = 'linkedscatter'
  )
}

#' Widget output function for use in Shiny
#'
#' @export
linkedscatterOutput <- function(outputId, width = '100%', height = '400px'){
  shinyWidgetOutput(outputId, 'linkedscatter', width, height, package = 'linkedscatter')
}

#' Widget render function for use in Shiny
#'
#' @export
renderLinkedscatter <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  shinyRenderWidget(expr, linkedscatterOutput, env, quoted = TRUE)
}
