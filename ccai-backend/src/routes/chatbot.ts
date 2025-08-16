import express from 'express';
import OpenAI from 'openai';

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'demo-key',
});

const truckingPrompts = {
  email_bid: `You are an expert trucking brokerage assistant. Help draft a professional email bid response for freight shipments. 
  Consider factors like:
  - Distance and route complexity
  - Commodity type and special requirements
  - Market rates and fuel costs
  - Carrier availability and reliability
  - Customer relationship and volume potential
  
  Keep the tone professional but personable, and always include next steps.`,
  
  voice_bid: `You are an expert trucking brokerage assistant. Help draft talking points for a phone bid discussion. 
  Consider factors like:
  - Building rapport and trust
  - Addressing concerns proactively
  - Competitive positioning
  - Value proposition beyond just price
  - Closing techniques
  
  Format as bullet points for easy reference during the call.`,
  
  load_analysis: `You are a trucking industry expert. Analyze this load opportunity and provide insights on:
  - Market rate assessment
  - Profitability potential
  - Risk factors
  - Carrier requirements
  - Competitive advantages
  
  Provide actionable recommendations.`
};

router.post('/draft-bid', async (req, res) => {
  try {
    const { type, loadDetails, customerInfo, notes } = req.body;

    if (process.env.OPENAI_API_KEY === 'demo-key') {
      const demoResponses = {
        email_bid: `Subject: Competitive Rate Quote for ${loadDetails?.origin || 'Your'} to ${loadDetails?.destination || 'Destination'} Shipment

Dear ${customerInfo?.contactName || 'Valued Customer'},

Thank you for considering CCAI Logistics for your shipping needs. Based on the details provided:

• Route: ${loadDetails?.origin || 'Origin'} → ${loadDetails?.destination || 'Destination'}
• Commodity: ${loadDetails?.commodity || 'General Freight'}
• Weight: ${loadDetails?.weight || 'TBD'} lbs

Our competitive rate for this shipment is $${loadDetails?.suggestedRate || '2,450'}, which includes:
✓ Vetted carrier network with 99.2% on-time delivery
✓ Real-time tracking and proactive communication
✓ $1M+ cargo insurance coverage
✓ Dedicated account management

We can have this load picked up within 24 hours and delivered safely to your destination. Our team is standing by to coordinate all logistics details.

Next Steps:
1. Confirm rate and terms
2. Provide BOL and shipping instructions
3. Schedule pickup appointment

I'm available for immediate discussion at ${customerInfo?.phone || '(555) 123-4567'}.

Best regards,
[Your Name]
CCAI Logistics Solutions`,

        voice_bid: `CALL STRUCTURE - ${customerInfo?.contactName || 'Customer'} Bid Discussion

🎯 OPENING (30 seconds)
• "Thanks for the opportunity to quote your ${loadDetails?.origin || 'shipment'}"
• "I've reviewed your requirements and have great news..."

💡 VALUE PROPOSITION (1 minute)
• Highlight our 99.2% on-time performance
• Mention our vetted carrier network (3,000+ approved)
• Reference similar successful shipments for comparable customers

💰 RATE PRESENTATION (45 seconds)
• "Based on current market conditions and your specific needs..."
• "Our rate of $${loadDetails?.suggestedRate || '2,450'} includes full service..."
• Address any rate concerns proactively

🤝 RELATIONSHIP BUILDING (30 seconds)
• Ask about their biggest shipping challenges
• Offer solutions beyond just this load
• Mention capacity commitments for regular lanes

🎯 CLOSING (30 seconds)
• "Can I get your approval to book this load today?"
• "What questions can I answer to move forward?"
• Set specific next steps and timeline

KEY TALKING POINTS:
• Emphasize partnership over transactional relationship
• Be prepared to justify rate with service value
• Have backup options ready (different carriers/timing)`,

        load_analysis: `LOAD ANALYSIS REPORT

📊 MARKET ASSESSMENT
• Current market rate range: $${(parseFloat(loadDetails?.suggestedRate || '2450') * 0.9).toFixed(0)} - $${(parseFloat(loadDetails?.suggestedRate || '2450') * 1.15).toFixed(0)}
• Your quoted rate: $${loadDetails?.suggestedRate || '2,450'} (competitive positioning)
• Fuel costs trending: Stable with slight increase expected

💰 PROFITABILITY ANALYSIS
• Estimated carrier cost: $${(parseFloat(loadDetails?.suggestedRate || '2450') * 0.8).toFixed(0)}
• Gross margin: ~20% ($${(parseFloat(loadDetails?.suggestedRate || '2450') * 0.2).toFixed(0)})
• Risk-adjusted return: Excellent for ${customerInfo?.companyName || 'this customer'}

⚠️ RISK FACTORS
• Weather considerations for this route
• Peak season capacity constraints
• Customer payment history: ${customerInfo?.paymentTerms || 'Standard terms'}

🚛 CARRIER REQUIREMENTS
• Equipment type: ${loadDetails?.equipmentType || 'Dry van'}
• Special requirements: ${loadDetails?.specialRequirements || 'Standard freight handling'}
• Preferred carriers: 15 available in network

🏆 COMPETITIVE ADVANTAGES
• Price competitiveness: Strong
• Service reliability: Superior
• Customer relationship: ${customerInfo?.relationshipLevel || 'Developing'}

RECOMMENDATION: ✅ PROCEED
This load aligns well with our strategic goals and profitability targets.`
      };

      return res.json({
        success: true,
        content: demoResponses[type as keyof typeof demoResponses] || demoResponses.email_bid,
        usage: { tokens: 150 }
      });
    }

    const systemPrompt = truckingPrompts[type as keyof typeof truckingPrompts] || truckingPrompts.email_bid;
    
    const userPrompt = `
    Load Details:
    ${JSON.stringify(loadDetails, null, 2)}
    
    Customer Information:
    ${JSON.stringify(customerInfo, null, 2)}
    
    Additional Notes:
    ${notes || 'None'}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    res.json({
      success: true,
      content: completion.choices[0].message.content,
      usage: completion.usage
    });

  } catch (error) {
    console.error('ChatGPT API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate bid content'
    });
  }
});

router.post('/chat', async (req, res) => {
  try {
    const { message, context } = req.body;

    if (process.env.OPENAI_API_KEY === 'demo-key') {
      const demoResponse = `I understand you're asking about "${message}". In a trucking brokerage context, this typically involves coordinating between shippers and carriers while ensuring:

• Competitive rates and reliable service
• Proper documentation and compliance
• Real-time tracking and communication
• Risk management and insurance coverage

For specific assistance with your freight needs, I'd recommend speaking with one of our logistics specialists who can provide detailed guidance based on your unique requirements.

Is there a particular aspect of freight brokerage you'd like me to explain further?`;

      return res.json({
        success: true,
        response: demoResponse
      });
    }

    const systemPrompt = `You are CCAI Assistant, an expert AI helper for trucking brokerage operations. 
    You help with freight logistics, carrier management, customer service, rate analysis, and industry insights.
    Always provide practical, actionable advice specific to the trucking and logistics industry.
    
    Context: ${context || 'General trucking brokerage inquiry'}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 500,
      temperature: 0.8,
    });

    res.json({
      success: true,
      response: completion.choices[0].message.content
    });

  } catch (error) {
    console.error('ChatGPT API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process chat request'
    });
  }
});

export default router;