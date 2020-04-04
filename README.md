# PS2 Scrims Script

![Overlay Example](https://imgur.com/ZLHFrl1)

## Getting Started

### Requirements

Make sure you have the latest [node.js](https://nodejs.org/en/) installed. This application requires at least Node 7.6.0 to run.

### Installation

Run `install.bat`.

## Running A Match

### Starting The Script

**IMPORTANT:** You need to restart the script *BEFORE **EVERY** MATCH*, regardless of how the match ended or if the script terminated with an error. Failing to do so may result in subsequent matches being scored incorrectly and other undesirable effects.

Run ``start.bat``. Alternatively, run the following from the command line:
   If the script started up successfully, you should see a message like this in opened terminal window:

   ```sh $
   Starting server...
   Connect to website @ localhost:3000
   ```

### Setting Up A Match

In the browser of your choice, navigate to <http://localhost:3000/admin>.

_You should see a screen with these forms on the left_ ![admin view](https://imgur.com/bfOfvKL)

## Other Admin Fields

#### Start Match
Will Start the Timer

Disable the change of teams or lane

#### Pause Match
Will Pause the Timer

Do not allow to change teams or lane

#### Resume Match
Will Resume the Timer

Do not allow to change teams or lane

#### End Round Match
Will End round prematurally.
Will reset timer to default value

Will allow to change lane and teams

#### Reset Match
Will Reset the Match.
Will reset timer to default value the number off round

Will allow to change lane and teams

#### Second Round and More

For the Second Round Just press Start

## Streaning Overlay Setup - OBS

In your streaming scene, add a new BrowserSource source and set to URL to ``http://localhost:3000/``.

Set the ``Width`` and ``Height`` to the full width of your monitor, and clear out the ``CSS`` box.

Check the ``Refresh browser when scene becomes active`` box at the bottom of the Properties window.

Click ``OK`` to save the source, then make sure it's visible and positioned above your Planetside 2 source.

_The Properties for your BrowserSource should look something like this_   
   ![BrowserSource Properties](https://imgur.com/8kFu3pa)


## Credits

Created by Atypick
Supported by the API and WebSocket of Middd
