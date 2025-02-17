import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../Store/ebooksSlice';
import bookPlaceholder from "../assets/images/book.png";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const groupEbooksByDomain = (ebooks) => {
    return ebooks.reduce((acc, ebook) => {
        if (!acc[ebook.domain]) {
            acc[ebook.domain] = [];
        }
        acc[ebook.domain].push(ebook);
        return acc;
    }, {});
};

const Ebooks = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    const [groupedEbooks, setGroupedEbooks] = useState([]);
    const { ebooks, loading } = useSelector(state => state.ebooks);

    useEffect(() => {
        const books = ebooks.ebooks;
        if (books) {
            setGroupedEbooks(groupEbooksByDomain(books));
        }
    }, [ebooks]);

    return (
        <div className="max-w-8xl mx-auto  ">
            <div className="shadow max-w-8xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold">Ebooks Library</h1>
            </div>
            <div className="p-8">

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, index) => (
                            <div key={index} className="border rounded-lg overflow-hidden shadow-md p-4">
                                <Skeleton height={208} />
                                <h3 className="mt-4"><Skeleton width={`80%`} /></h3>
                                <Skeleton width={`40%`} height={20} className="mt-2" />
                                <Skeleton width={`60%`} height={15} className="mt-2" />
                                <Skeleton height={40} className="mt-4" />
                            </div>
                        ))}
                    </div>
                ) : (
                    Object.entries(groupedEbooks).map(([domain, domainEbooks]) => (
                        <div key={domain} className="mb-12">
                            <h2 className="text-2xl font-semibold mb-6">{domain}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {domainEbooks.map((ebook) => (
                                    <div key={ebook.e_book_id} className="border rounded-lg overflow-hidden shadow-md">
                                        <div className="relative h-52 w-full">
                                            <img
                                                src={bookPlaceholder}
                                                alt={ebook.e_book_name}
                                                className="object-contain size-full"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 title={ebook.e_book_name} className="text-lg line-clamp-1 font-semibold mb-2">{ebook.e_book_name}</h3>
                                            <span className="inline-block bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
                                                {ebook.domain}
                                            </span>
                                            <p className="text-sm text-gray-500 mt-2">
                                                Updated: {new Date(ebook.updated_date).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="p-4">
                                            <a
                                                href={ebook.e_book_object_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block text-center bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark"
                                            >
                                                Read Ebook
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
};

export default Ebooks;
