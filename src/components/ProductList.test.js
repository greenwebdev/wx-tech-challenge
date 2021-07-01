import { render, screen, within } from 'test-utils';
import ProductList from 'components/ProductList';

const mockProducts = [{ "productId": "bcf1371f-0eac-472b-83d0-efde4a0515e8", "name": "Honeydew", "description": "Yellow skinned melon with white or green flesh.", "audPrice": 2.3, "stockOnHand": 30 }, { "productId": "59133a06-5a12-4c65-8612-78a8b5567cd7", "name": "Kiwi Fruit", "description": "Oval shaped fruit, tapering at one end, with thin, brown, furry skin and gold-coloured flesh. Imported from New Zealand.", "audPrice": 0.98, "stockOnHand": 200 }, { "productId": "ba122544-5d10-45da-83c4-d3d34ad89dae", "name": "Cabbage Chinese Wombok whole each", "description": "Large and cylindrical in shape, with layers of tightly packed leaves. Each leaf has a long, fleshy, thick white stem and mid-green colour leaves. Uncooked.", "audPrice": 5.3, "stockOnHand": 3 }, { "productId": "2eb766cf-e8b9-41e5-bd43-5eb653891f36", "name": "Iced Coffee 500", "description": "Pasteurised reduced fat milk with coffee.", "audPrice": 3.4, "stockOnHand": 10 }, { "productId": "890eab40-47b5-4630-8ff6-30df30b19ada", "name": "Cheese & Bacon Melt Frozen Pizza", "description": "", "audPrice": 10, "stockOnHand": 15 }, { "productId": "e65cd55e-5656-4048-8365-7a88de1080a6", "name": "Thawed Jumbo Tiger Prawn", "description": "", "audPrice": 27, "stockOnHand": 0 }];

test('renders empty product list', () => {
    render(<ProductList />);
    const list = screen.getByRole('list', {
        name: /products/i,
    });
    expect(list).toBeInTheDocument();
});

test('renders products in list when given', () => {
    render(<ProductList products={mockProducts} />,);

    const list = screen.getByRole('list', {
        name: /products/i,
    });
    const { getAllByRole } = within(list);
    const items = getAllByRole('listitem');
    expect(items.length).toBe(6);
});
