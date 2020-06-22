YO YO YO

So step 1 was getting a posthtml function that can add the statement tracker component which we have accomplished as of dcb1a8a05ab1efe94e7a1d32b287ad6c101f93dc
This needed to work for 
1) elements with contnet. We conclude that a closing tag is the same as a closing } and so does not require coverage (<div></div> = ((const a = 1){}) in JS)
2) Many statements on a single line
3) Self closing statements
4) Arbiratrily nested elements

Now we need to figure out how to track the location of each element in order to generate a correct statement map for the statement ids to work. Location statements now functioning. Actually wasn't too bad to get working. Recurssion was a bit nuts. Maybe it's becuase I hit prework outs before coding. 40670aa7cee94a23bfe7f501484722b7f77a33a4
Next challenge around this is likely to be how to get the coverage information from the template into the JS code coverage. Don't have enough information about the situation within the webpack plugin so will look at that later.

Right... lets render some vue templates. For now we will ignore the JS problem and hope it doesn't fuck me. Probably will. Oh well.
